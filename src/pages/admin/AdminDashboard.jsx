import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { LogOut, Save, Plus, Trash2, Globe, LayoutDashboard, Link as LinkIcon, Settings, Image as ImageIcon, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const AdminDashboard = () => {
  const { data, updateData, loading } = useData();
  const [formData, setFormData] = useState({ title: '', description: '', logo: '', links: [] });
  const [logoFile, setLogoFile] = useState(null);
  const [activeTab, setActiveTab] = useState('links');

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleSave = async () => {
    const res = await updateData(formData);
    if (res.success) alert('تم حفظ التغييرات بنجاح');
    else alert('حدث خطأ أثناء الحفظ');
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return;
    const form = new FormData();
    form.append('logo', logoFile);

    try {
      const API_URL = import.meta.env.DEV ? 'http://localhost:4002' : '';
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: form
      });
      const result = await res.json();
      if (result.success) {
        setFormData({ ...formData, logo: result.logoUrl });
        alert('تم رفع الشعار بنجاح');
      }
    } catch (e) {
      alert('خطأ أثناء رفع الشعار');
    }
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { id: Date.now().toString(), title: 'رابط جديد', url: 'https://', icon: 'Globe' }]
    });
  };

  const updateLink = (id, field, value) => {
    const newLinks = formData.links.map(l => l.id === id ? { ...l, [field]: value } : l);
    setFormData({ ...formData, links: newLinks });
  };

  const removeLink = (id) => {
    setFormData({ ...formData, links: formData.links.filter(l => l.id !== id) });
  };

  if (loading || !data) return <div className="min-h-screen flex items-center justify-center text-islamic-emerald">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex relative font-cairo" dir="rtl">
      {/* Hussary Watermark Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-center bg-cover bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/husary.png)' }}
      ></div>

      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-md border-l border-gray-100 shadow-sm flex flex-col h-screen fixed right-0 z-20">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-islamic-emerald rounded-lg flex items-center justify-center">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <h1 className="font-amiri font-bold text-xl text-islamic-emerald">الإدارة</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('links')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'links' ? 'bg-islamic-emerald/10 text-islamic-emerald font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LinkIcon size={18} /> الروابط
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-islamic-emerald/10 text-islamic-emerald font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={18} /> الإعدادات
          </button>
          <button 
            onClick={() => setActiveTab('qrcode')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'qrcode' ? 'bg-islamic-emerald/10 text-islamic-emerald font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <QrCode size={18} /> رمز الاستجابة السريع (QR)
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 mr-64 p-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'links' ? 'إدارة الروابط' : activeTab === 'settings' ? 'الإعدادات العامة' : 'رمز الاستجابة السريع (QR Code)'}
            </h2>
            {activeTab !== 'qrcode' && (
              <button onClick={handleSave} className="flex items-center gap-2 bg-islamic-emerald text-white px-6 py-2.5 rounded-xl hover:bg-islamic-emerald/90 transition-all shadow-md shadow-islamic-emerald/20">
                <Save size={18} /> حفظ التغييرات
              </button>
            )}
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
          >
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الشعار (Logo)</label>
                  <div className="flex items-center gap-4">
                    {formData.logo ? (
                      <img src={formData.logo} className="w-16 h-16 rounded-full border-2 border-islamic-gold object-cover" alt="Logo" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"><ImageIcon className="text-gray-400" /></div>
                    )}
                    <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-islamic-emerald/10 file:text-islamic-emerald hover:file:bg-islamic-emerald/20" onChange={e => setLogoFile(e.target.files[0])} />
                    <button onClick={handleLogoUpload} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap">رفع الصورة</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنصة</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-islamic-emerald/50 focus:border-islamic-emerald outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الوصف المختصر</label>
                  <textarea rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-islamic-emerald/50 focus:border-islamic-emerald outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-4">
                {formData.links.map((link, index) => (
                  <div key={link.id} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 flex flex-col md:flex-row gap-4 relative group">
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => removeLink(link.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-3">
                        <input type="text" placeholder="عنوان الرابط" className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-islamic-emerald/50 outline-none" value={link.title} onChange={e => updateLink(link.id, 'title', e.target.value)} />
                        <select className="w-40 px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-islamic-emerald/50" value={link.icon} onChange={e => updateLink(link.id, 'icon', e.target.value)}>
                          {['Globe', 'Facebook', 'Whatsapp', 'Instagram', 'Youtube', 'Linkedin', 'Twitter', 'Telegram', 'Tiktok', 'Snapchat', 'Discord', 'Github', 'Mail', 'Phone', 'MapPin'].map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <input type="text" placeholder="https://..." dir="ltr" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-islamic-emerald/50 outline-none text-left" value={link.url} onChange={e => updateLink(link.id, 'url', e.target.value)} />
                    </div>
                  </div>
                ))}
                
                <button onClick={addLink} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-islamic-emerald hover:border-islamic-emerald/50 transition-all flex items-center justify-center gap-2">
                  <Plus size={20} /> إضافة رابط جديد
                </button>
              </div>
            )}

            {activeTab === 'qrcode' && (
              <div className="flex flex-col items-center justify-center space-y-8 py-8">
                <div className="text-center max-w-md">
                  <p className="text-gray-600 mb-6">
                    قم بتحميل رمز الاستجابة السريع هذا وقم بطباعته على الكروت الخاصة بك، بمجرد أن يقوم أي شخص بمسحه باستخدام كاميرا الهاتف سيتم توجيهه مباشرة إلى صفحتك.
                  </p>
                </div>
                
                <div className="p-4 bg-white border-4 border-islamic-emerald rounded-3xl shadow-xl">
                  <QRCodeCanvas 
                    id="qrcode-canvas"
                    value={window.location.origin + '/links'} 
                    size={250} 
                    level={"H"} 
                    fgColor={"#065f46"} 
                    bgColor={"#ffffff"} 
                    imageSettings={{
                      src: formData.logo ? formData.logo : '/husary.png',
                      x: undefined,
                      y: undefined,
                      height: 50,
                      width: 50,
                      excavate: true,
                    }}
                  />
                </div>
                
                <button 
                  onClick={() => {
                    const canvas = document.getElementById('qrcode-canvas');
                    if (canvas) {
                      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                      const downloadLink = document.createElement('a');
                      downloadLink.href = pngUrl;
                      downloadLink.download = 'tajweed-qrcode.png';
                      document.body.appendChild(downloadLink);
                      downloadLink.click();
                      document.body.removeChild(downloadLink);
                    }
                  }}
                  className="flex items-center gap-2 bg-islamic-gold text-white px-8 py-3 rounded-xl hover:bg-yellow-600 transition-all shadow-lg font-bold text-lg"
                >
                  <Download size={20} /> تحميل الـ QR Code
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
