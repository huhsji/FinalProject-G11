import React from 'react';

// สไตล์คอมโพเนนต์สำหรับแสดงรูปภาพขนาดใหญ่
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  container: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '90vh',
    objectFit: 'contain',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '20px',
    border: 'none',
    outline: 'none'
  }
};

/**
 * คอมโพเนนต์ ImageModal สำหรับแสดงรูปภาพขนาดใหญ่
 * 
 * @param {Object} props - คุณสมบัติของคอมโพเนนต์
 * @param {string} props.imageUrl - URL ของรูปภาพที่ต้องการแสดง
 * @param {Function} props.onClose - ฟังก์ชันที่เรียกเมื่อปิดโมดัล
 */
const ImageModal = ({ imageUrl, onClose }) => {
  // ป้องกันการคลิกภายในคอนเทนเนอร์ของรูปภาพแล้วปิดโมดัล
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.container} onClick={handleContentClick}>
        <img 
          src={imageUrl} 
          alt="Full size" 
          style={modalStyles.image}
        />
        <button 
          style={modalStyles.closeButton} 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;