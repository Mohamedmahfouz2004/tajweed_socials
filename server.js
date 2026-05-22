import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DATA_FILE = path.join(__dirname, 'data.json');

// Ensure uploads folder exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ title: "تَجْوِيد.ai", description: "", logo: "", links: [] }));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Admin Password Check
const ADMIN_PASS = 'admin123';
const authMiddleware = (req, res, next) => {
    const pass = req.headers['authorization'];
    if (pass === ADMIN_PASS) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

app.post('/api/auth', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASS) {
        res.json({ success: true, token: ADMIN_PASS });
    } else {
        res.status(401).json({ error: 'كلمة المرور غير صحيحة' });
    }
});

app.get('/api/data', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    res.json(data);
});

app.post('/api/data', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.post('/api/upload', upload.single('logo'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const logoUrl = `/uploads/${req.file.filename}`;
    
    // Update data.json with new logo
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    data.logo = logoUrl;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    res.json({ success: true, logoUrl });
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
