import React, { useState } from 'react';

const ShareButton = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareText, setShareText] = useState('');

  // เปิด/ปิดป๊อปอัพแชร์
  const togglePopup = (e) => {
    e.stopPropagation(); // ป้องกันการนำทางไปหน้าลงทะเบียนเมื่อคลิกปุ่ม share
    setIsOpen(!isOpen);
  };

  // จัดการการแชร์คอนเทนต์
  const handleShare = (platform, e) => {
    e.stopPropagation(); // ป้องกันการนำทางไปหน้าลงทะเบียน
    
    // ได้ URL ปัจจุบัน
    const currentUrl = window.location.href;
    // สร้างข้อความสำหรับแชร์
    const text = shareText || `มาดูโปรโมชั่นทริป ${title || 'แคมป์ปิ้ง'} ที่น่าสนใจนี้!`;
    
    // เลือกแพลตฟอร์มที่จะแชร์
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'line':
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=แชร์ทริปแคมป์ปิ้ง&body=${encodeURIComponent(text + '\n\n' + currentUrl)}`, '_blank');
        break;
      default:
        console.log('แชร์ผ่าน:', platform);
    }
    
    // ปิดป๊อปอัพหลังแชร์
    setIsOpen(false);
  };

  return (
    <>
      {/* ปุ่มแชร์รูปลูกศร */}
      <button
        onClick={togglePopup}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
          padding: 0
        }}
      >
        <svg 
          width="30" 
          height="30" 
          viewBox="0 0 1080 1080" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M888.889 1080C644.444 1080 444.444 880 444.444 635.556V280L148.889 575.556L0 426.667L540 0L1080 426.667L931.111 575.556L635.556 280V635.556C635.556 775.556 748.889 888.889 888.889 888.889C1028.89 888.889 1080 775.556 1080 635.556H1080V1080H888.889V1080Z" 
            fill="#10173a" 
            transform="scale(1) translate(0, 0)"
          />
        </svg>
      </button>

      {/* ป๊อปอัพแชร์ */}
      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '10px',
            width: '300px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '16px',
            zIndex: 1001
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', textAlign: 'center', fontSize: '18px' }}>แชร์โปรโมชั่น</h3>
          
          {/* ช่องกรอกข้อความแชร์ */}
          <textarea
            placeholder="เขียนข้อความของคุณที่นี่..."
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            style={{
              width: '100%',
              height: '80px',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginBottom: '10px',
              resize: 'none'
            }}
          />
          
          {/* ปุ่มแชร์โซเชียลมีเดีย */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button
              onClick={(e) => handleShare('facebook', e)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#1877F2',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </button>
            
            <button
              onClick={(e) => handleShare('twitter', e)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#1DA1F2',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </button>
            
            <button
              onClick={(e) => handleShare('line', e)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#00C300',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M22 10.6c0-4.8-4.8-8.6-10.8-8.6C5.2 2 .4 5.8.4 10.6c0 4.2 3.8 7.8 8.9 8.5.4.1.9.2.9.5 0 .2-.1.5-.2.8 0 0-.3 1.6-.3 1.9-.1.5.3.8.7.3.1-.1 1.1-.7 1.8-1.2 1.8-1.2 4.9-2.7 6.6-4.5 1.5-1.5 2.2-3.3 2.2-5.3"/>
              </svg>
            </button>
            
            <button
              onClick={(e) => handleShare('email', e)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#EA4335',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
          </div>
          
          {/* ปุ่มปิดป๊อปอัพ */}
          <button
            onClick={togglePopup}
            style={{
              marginTop: '15px',
              width: '100%',
              padding: '8px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ปิด
          </button>
        </div>
      )}
    </>
  );
};

export default ShareButton;