import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Component/Pro.css';
import { useTrips } from './TripContext';
import shareIcon from '../assets/share.png';
import SharePopup from './SharePopup';

const Pro = () => {
    const navigate = useNavigate();
    const { trips } = useTrips();
    const [currentImageIndices, setCurrentImageIndices] = useState({});
    const [hoveredCard, setHoveredCard] = useState(null);
    
    // Replace sharePopupState with these states
    const [sharePopupOpen, setSharePopupOpen] = useState(false);
    const [sharePromoData, setSharePromoData] = useState(null);
    
    // สร้าง State ค่าเริ่มต้นสำหรับดัชนีรูปภาพของแต่ละโปรโมชั่น
    useEffect(() => {
        const initialIndices = {};
        trips.forEach((_, index) => {
            initialIndices[index] = 0;
        });
        setCurrentImageIndices(initialIndices);
    }, [trips]);

    // สลับรูปภาพทุก 3 วินาทีสำหรับแต่ละโปรโมชั่นอย่างอิสระ
    useEffect(() => {
        const intervals = trips.map((_, index) => {
            return setInterval(() => {
                setCurrentImageIndices(prevIndices => ({
                    ...prevIndices,
                    [index]: (prevIndices[index] + 1) % 3
                }));
            }, 3000);
        });
        
        // ล้าง interval เมื่อ component unmount
        return () => intervals.forEach(interval => clearInterval(interval));
    }, [trips]);

    // ฟังก์ชันสำหรับนำทางไปยังหน้าลงทะเบียน
    const handleCardClick = useCallback((index) => {
        console.log(`Selected trip: ${trips[index].title}`);
        // นำทางไปยังหน้าลงทะเบียนพร้อมส่ง ID ทริป
        navigate(`/register/${trips[index].id}`);
    }, [navigate, trips]);

    // New function to open SharePopup
    const handleOpenSharePopup = (e, index) => {
        e.stopPropagation(); // ป้องกันการนำทางไปหน้าลงทะเบียน
        
        // เก็บข้อมูลโปรโมชั่นที่ต้องการแชร์
        const promoToShare = trips[index];
        setSharePromoData({
            title: promoToShare.title,
            details: promoToShare.details,
            discount: promoToShare.discount,
            imageUrl: promoToShare.images[currentImageIndices[index] || 0],
            tripId: promoToShare.id
        });
        
        // เปิด SharePopup
        setSharePopupOpen(true);
    };

    // Function to close SharePopup
    const handleCloseSharePopup = () => {
        setSharePopupOpen(false);
        setSharePromoData(null);
    };

    return (
        <>
            {/* เพิ่ม div สำหรับพื้นหลัง */}
            <div className="pro-background"></div>
            
            <h1 className="page-title">Promotion Trip</h1>
            <div className="menu-container">
                {trips.map((promo, index) => (
                    <div 
                        className={`menu-card ${hoveredCard === index ? 'hovered' : ''}`}
                        key={index}
                        onClick={() => handleCardClick(index)}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{ position: 'relative' }} // เพิ่ม position relative เพื่อให้ปุ่ม share ตำแหน่งถูกต้อง
                    >
                        <div className="menu-content">
                            <div className="menu-info">
                                <h2>{promo.title}</h2>
                                <p>{promo.offer}</p>
                                <h3>{promo.discount}</h3>
                                <p>ติดต่อ: {promo.contact}</p>
                                <p>รายละเอียด: {promo.details}</p>
                                <div className="capacity-info">จำนวน: {promo.registered}/{promo.capacity}</div>
                            </div>
                            <div className="menu-image">
                                <img 
                                    src={promo.images[currentImageIndices[index] || 0]} 
                                    alt={promo.title} 
                                />
                            </div>
                        </div>
                        
                        {/* ปุ่มแชร์ใช้รูป share.png */}
                        <button
                            onClick={(e) => handleOpenSharePopup(e, index)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                width: '24px',
                                height: '24px',
                                padding: 0,
                                transition: 'transform 0.2s ease-in-out',
                                transform: hoveredCard === index ? 'scale(1.2)' : 'scale(1)'
                            }}
                            aria-label="แชร์"
                        >
                            {/* ใช้รูปภาพ share.png */}
                            <img 
                                src={shareIcon} 
                                alt="แชร์" 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'contain'
                                }}
                            />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add SharePopup component */}
            {sharePopupOpen && (
                <SharePopup 
                    isOpen={sharePopupOpen}
                    onClose={handleCloseSharePopup}
                    promoData={sharePromoData}
                />
            )}
        </>
    );
};

export default Pro;