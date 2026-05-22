import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminView = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [data, setData] = useState({ title: '', description: '', logo: '', links: [] });
  const [logoFile, setLogoFile] = useState(null);

  const availableIcons = ['Globe', 'Facebook', 'MessageCircle', 'Twitter', 'Instagram', 'Youtube', 'Linkedin', 'Phone', 'Mail', 'MapPin'];

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4001/api/data');
      const d = await res.json();
      setData(d);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4001/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const result = await res.json();
      if (result.success) {
        setToken(result.token);
        localStorage.setItem('adminToken', result.token);
        setError('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('خطأ في الاتصال بالسيرفر');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  const handleSave = async () => {
    try {
      await fetch('http://localhost:4001/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      });
      alert('تم الحفظ بنجاح');
    } catch (e) {
      alert('خطأ أثناء الحفظ');
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return;
    const formData = new FormData();
    formData.append('logo', logoFile);

    try {
      const res = await fetch('http://localhost:4001/api/upload', {
        method: 'POST',
        headers: { 'Authorization': token },
        body: formData
      });
      const result = await res.json();
      if (result.success) {
        setData({ ...data, logo: result.logoUrl });
        alert('تم رفع الشعار بنجاح');
      }
    } catch (e) {
      alert('خطأ أثناء رفع الشعار');
    }
  };

  const addLink = () => {
    setData({
      ...data,
      links: [...data.links, { id: Date.now().toString(), title: 'رابط جديد', url: 'https://', icon: 'Globe' }]
    });
  };

  const updateLink = (id, field, value) => {
    const newLinks = data.links.map(l => l.id === id ? { ...l, [field]: value } : l);
    setData({ ...data, links: newLinks });
  };

  const deleteLink = (id) => {
    setData({ ...data, links: data.links.filter(l => l.id !== id) });
  };

  if (!token) {
    return (
      <div className="admin-container" style={{maxWidth: '400px'}}>
        <h2 className="title" style={{marginBottom: '2rem'}}>تسجيل الدخول للإدارة</h2>
        <form onSubmit={handleLogin} className="login-form" style={{marginTop: 0}}>
          <input
            type="password"
            className="form-input"
            placeholder="كلمة المرور..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{color: '#ef4444', fontSize: '0.9rem'}}>{error}</p>}
          <button type="submit" className="btn-primary" style={{width: '100%'}}>دخول</button>
          <Link to="/" style={{color:'var(--text-secondary)', marginTop:'1rem', textDecoration:'none'}}>العودة للصفحة الرئيسية</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">لوحة التحكم</h2>
        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
          <Link to="/" style={{color:'var(--accent-green)', textDecoration:'none', fontWeight:'bold'}}>معاينة الصفحة</Link>
          <button onClick={handleLogout} className="btn-danger" style={{background: 'transparent', border:'1px solid #ef4444', color:'#ef4444'}}>خروج</button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">الشعار (Logo)</label>
        <div className="flex-row">
          <input type="file" className="form-input" onChange={(e) => setLogoFile(e.target.files[0])} accept="image/*" />
          <button onClick={handleLogoUpload} className="btn-primary">رفع الشعار</button>
        </div>
        {data.logo && <img src={`http://localhost:4001${data.logo}`} alt="Logo" style={{width:'80px', height:'80px', marginTop:'1rem', borderRadius:'50%', border:'2px solid var(--accent-gold)'}} />}
      </div>

      <div className="form-group">
        <label className="form-label">اسم الصفحة (Title)</label>
        <input 
          type="text" 
          className="form-input" 
          value={data.title} 
          onChange={(e) => setData({...data, title: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label className="form-label">الوصف (Description)</label>
        <textarea 
          className="form-input" 
          value={data.description} 
          onChange={(e) => setData({...data, description: e.target.value})}
          rows={3}
        />
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'3rem', borderTop:'1px solid var(--btn-border)', paddingTop:'2rem'}}>
        <h3 style={{color:'white'}}>إدارة الروابط</h3>
        <button onClick={addLink} className="btn-primary" style={{background: 'var(--accent-gold)', color: '#000'}}>+ إضافة رابط</button>
      </div>

      <div className="admin-links-list">
        {data.links.map((link) => (
          <div key={link.id} className="admin-link-card">
            <div className="flex-row">
              <input 
                type="text" 
                className="form-input" 
                placeholder="العنوان" 
                value={link.title} 
                onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                style={{flex: 1}}
              />
              <select 
                className="form-input" 
                value={link.icon} 
                onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
                style={{flex: 0.5}}
              >
                {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <div className="flex-row" style={{marginTop:'0.5rem'}}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="الرابط (URL)" 
                value={link.url} 
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                style={{flex: 1, direction: 'ltr'}}
              />
              <button onClick={() => deleteLink(link.id)} className="btn-danger">حذف</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop: '3rem', textAlign: 'center'}}>
        <button onClick={handleSave} className="btn-primary" style={{fontSize: '1.2rem', padding: '1rem 3rem', width: '100%'}}>
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

export default AdminView;
