import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const UserView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4001/api/data')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div style={{color:'white', marginTop:'2rem'}}>جاري التحميل...</div>;

  const renderIcon = (iconName, color) => {
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return <LucideIcons.Globe color={color || "white"} />;
    return <IconComponent color={color || "white"} size={20} />;
  };

  return (
    <div className="user-container">
      <div className="logo-wrapper">
        {data.logo ? (
          <img src={`http://localhost:4001${data.logo}`} alt="Logo" className="logo-img" />
        ) : (
          <div className="logo-placeholder">
            <LucideIcons.BookOpen size={48} />
          </div>
        )}
      </div>

      <h1 className="title">{data.title || "تَجْوِيد.ai"}</h1>
      <div className="title-line"></div>
      
      <p className="description">{data.description}</p>

      <div className="links-container">
        {data.links && data.links.map(link => {
          // Define a fallback color mapped by icon or use primary
          let iconColor = "white";
          let bgColor = "var(--btn-bg)";
          if (link.icon === 'Facebook') { iconColor = '#1877F2'; bgColor = 'rgba(24, 119, 242, 0.1)'; }
          if (link.icon === 'MessageCircle' || link.icon === 'Whatsapp') { iconColor = '#25D366'; bgColor = 'rgba(37, 211, 102, 0.1)'; }
          if (link.icon === 'Globe') { iconColor = '#f59e0b'; bgColor = 'rgba(245, 158, 11, 0.1)'; }
          if (link.icon === 'Instagram') { iconColor = '#E1306C'; bgColor = 'rgba(225, 48, 108, 0.1)'; }
          if (link.icon === 'Youtube') { iconColor = '#FF0000'; bgColor = 'rgba(255, 0, 0, 0.1)'; }
          
          return (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="link-btn">
              <LucideIcons.ChevronLeft size={16} color="var(--text-secondary)" />
              <span className="link-title">{link.title}</span>
              <div className="link-icon-wrapper" style={{background: bgColor}}>
                {renderIcon(link.icon, iconColor)}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default UserView;
