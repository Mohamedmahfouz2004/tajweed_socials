import React from 'react';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaTelegram, FaTiktok, FaSnapchatGhost, FaDiscord, FaGithub } from 'react-icons/fa';

const PublicPage = () => {
  const { data, loading } = useData();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
        <div className="w-12 h-12 border-4 border-islamic-emerald/20 border-t-islamic-emerald rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderIcon = (iconName, colorClass) => {
    switch (iconName) {
      case 'Facebook': return <FaFacebook className={colorClass} size={24} />;
      case 'Whatsapp': return <FaWhatsapp className={colorClass} size={24} />;
      case 'Instagram': return <FaInstagram className={colorClass} size={24} />;
      case 'Youtube': return <FaYoutube className={colorClass} size={24} />;
      case 'Twitter': return <FaTwitter className={colorClass} size={24} />;
      case 'Linkedin': return <FaLinkedin className={colorClass} size={24} />;
      case 'Telegram': return <FaTelegram className={colorClass} size={24} />;
      case 'Tiktok': return <FaTiktok className={colorClass} size={24} />;
      case 'Snapchat': return <FaSnapchatGhost className={colorClass} size={24} />;
      case 'Discord': return <FaDiscord className={colorClass} size={24} />;
      case 'Github': return <FaGithub className={colorClass} size={24} />;
      case 'MessageCircle': return <FaWhatsapp className={colorClass} size={24} />;
      default:
        const IconComp = LucideIcons[iconName];
        if (!IconComp) return <LucideIcons.Globe className={colorClass} size={24} />;
        return <IconComp className={colorClass} size={24} />;
    }
  };

  const getIconColors = (iconName) => {
    switch (iconName) {
      case 'Facebook': return { bg: 'bg-[#1877F2]/10', text: 'text-[#1877F2]' };
      case 'Whatsapp': 
      case 'MessageCircle': return { bg: 'bg-[#25D366]/10', text: 'text-[#25D366]' };
      case 'Instagram': return { bg: 'bg-[#E1306C]/10', text: 'text-[#E1306C]' };
      case 'Youtube': return { bg: 'bg-[#FF0000]/10', text: 'text-[#FF0000]' };
      case 'Linkedin': return { bg: 'bg-[#0077B5]/10', text: 'text-[#0077B5]' };
      case 'Twitter': return { bg: 'bg-[#1DA1F2]/10', text: 'text-[#1DA1F2]' };
      case 'Telegram': return { bg: 'bg-[#0088cc]/10', text: 'text-[#0088cc]' };
      case 'Tiktok': return { bg: 'bg-black/10', text: 'text-black' };
      case 'Snapchat': return { bg: 'bg-[#FFFC00]/20', text: 'text-[#e6e300]' };
      case 'Discord': return { bg: 'bg-[#5865F2]/10', text: 'text-[#5865F2]' };
      case 'Github': return { bg: 'bg-[#333]/10', text: 'text-[#333]' };
      default: return { bg: 'bg-islamic-emerald/10', text: 'text-islamic-emerald' };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] relative overflow-hidden font-cairo" dir="rtl">
      {/* Hussary Watermark Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] bg-center bg-cover bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/husary.png)' }}
      ></div>

      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-islamic-emerald/5 rounded-full blur-[100px] animate-float-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-islamic-teal/5 rounded-full blur-[100px] animate-float-medium"></div>
      <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-xl mx-auto px-6 py-16 relative z-10 min-h-screen flex flex-col items-center">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="relative mb-6">
            <img src={data.logo || "/newlogo.svg"} className="w-36 h-36 relative z-10 rounded-full object-cover" alt="Logo" />
          </div>

          <h1 className="flex items-center justify-center drop-shadow-sm mb-3" dir="rtl" style={{ gap: '6px', flexDirection: 'row' }}>
            <span style={{ fontFamily: '"Amiri Quran", serif', fontWeight: 'bold', fontSize: '32px', color: '#065f46' }}>تَجْوِيد</span>
            <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', fontSize: '26px', color: '#d4af37' }}>.</span>
            <span style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '24px', color: '#d4af37', letterSpacing: '2px' }} dir="ltr">ai</span>
          </h1>
          <div className="flex items-center gap-2 mb-4 justify-center">
            <div className="h-[2px] w-12 bg-islamic-emerald/20"></div>
            <div className="w-2 h-2 rounded-full bg-islamic-gold"></div>
            <div className="h-[2px] w-12 bg-islamic-emerald/20"></div>
          </div>
          <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-sm">{data.description}</p>
        </motion.div>

        {/* Links List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full space-y-4"
        >
          {data.links && data.links.map((link) => {
            const colors = getIconColors(link.icon);
            return (
              <motion.a
                key={link.id}
                variants={itemVariants}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-sm hover:shadow-xl hover:border-islamic-emerald/20 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-islamic-emerald/0 via-islamic-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg} relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                  {renderIcon(link.icon, colors.text)}
                </div>
                
                {/* Title */}
                <div className="flex-1 px-5 relative z-10">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-islamic-emerald transition-colors">{link.title}</h3>
                </div>
                
                {/* Arrow */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-islamic-emerald group-hover:bg-islamic-emerald/10 transition-all relative z-10">
                  <LucideIcons.ArrowUpLeft size={20} className="group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-gray-400 text-sm font-medium"
        >
          <p dir="ltr" className="flex items-center justify-center gap-1">
            <span>Powered by</span>
            <span className="flex items-center" dir="rtl" style={{ gap: '4px', flexDirection: 'row' }}>
              <span style={{ fontFamily: '"Amiri Quran", serif', fontWeight: 'bold', fontSize: '18px', color: '#065f46' }}>تَجْوِيد</span>
              <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', fontSize: '14px', color: '#d4af37' }}>.</span>
              <span style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '12px', color: '#d4af37', letterSpacing: '1px' }} dir="ltr">ai</span>
            </span>
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default PublicPage;
