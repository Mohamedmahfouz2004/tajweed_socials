import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4 relative font-cairo" dir="rtl">
      {/* Hussary Watermark Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-center bg-cover bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/husary.png)' }}
      ></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel max-w-md w-full rounded-3xl p-8 relative overflow-hidden z-10"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-emerald/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-islamic-teal/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-islamic-emerald/10 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="text-islamic-emerald" size={32} />
          </div>
          
          <h2 className="text-3xl font-amiri font-bold text-islamic-emerald mb-2">لوحة التحكم</h2>
          <p className="text-islamic-sage mb-8 text-center">أدخل كلمة المرور للوصول إلى لوحة تحكم الإدارة</p>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-islamic-emerald/50 focus:border-islamic-emerald outline-none transition-all text-center"
                placeholder="كلمة المرور..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-islamic-emerald hover:bg-islamic-emerald/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-islamic-emerald/30 flex items-center justify-center gap-2"
            >
              دخول
            </button>
            
            <button 
              type="button"
              onClick={() => navigate('/links')}
              className="w-full flex items-center justify-center gap-2 text-islamic-sage hover:text-islamic-emerald transition-colors mt-4"
            >
              العودة للمنصة <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
