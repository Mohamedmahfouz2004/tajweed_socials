import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://tajweed_social_1287:Mohamed1%40@cluster0.sk6jwnj.mongodb.net/tajweed_socials?appName=Cluster0';
mongoose.connect(MONGO_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schema
const profileSchema = new mongoose.Schema({
    title: { type: String, default: "تَجْوِيد.ai" },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
    links: { type: Array, default: [] }
});
const Profile = mongoose.model('Profile', profileSchema);

const storage = multer.memoryStorage();
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

app.get('/api/data', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = await Profile.create({ title: "تَجْوِيد.ai" });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post('/api/data', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile();
        }
        profile.title = req.body.title;
        profile.description = req.body.description;
        profile.links = req.body.links;
        await profile.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.post('/api/upload', upload.single('logo'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    try {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        let profile = await Profile.findOne();
        if (!profile) profile = new Profile();
        
        profile.logo = base64Image;
        await profile.save();
        
        res.json({ success: true, logoUrl: base64Image });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save image' });
    }
});

export default app;
