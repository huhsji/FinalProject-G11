import React, { useState, useEffect, useCallback, forwardRef } from "react";
import axios from "axios";
import "../Component/post.css";
import Image from "../assets/golden.webp";
import ImgKhaoYai from "../assets/KhaoYai.webp";
import Like from "../assets/Like.png";
import Love from "../assets/Love.png";
import { MoreVert } from "@mui/icons-material";
import Comment from "./Comment"; // นำเข้า Comment Component
import { useNavigate } from "react-router-dom"; // เพิ่มเข้ามาเพื่อนำทาง

// คอมโพเนนต์นี้สามารถใช้ซ้ำได้ทั้งสำหรับโพสต์ที่กำหนดค่าไว้ล่วงหน้าและโพสต์แบบไดนามิกจาก API
// แปลงเป็น forwardRef เพื่อสามารถรับ ref จากภายนอก
const Post = forwardRef(({ post, onPostDeleted }, ref) => {
  const navigate = useNavigate(); // เพิ่ม navigate สำหรับการนำทาง
  // สถานะสำหรับเมนูตัวเลือก (3 ขีด)
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [displayedTime, setDisplayedTime] = useState("เมื่อสักครู่");
  const [likeCount, setLikeCount] = useState(32); // สถานะสำหรับจำนวนการถูกใจ
  const [isLiked, setIsLiked] = useState(false); // สถานะการถูกใจของผู้ใช้

  // ถ้าคอมโพเนนต์ได้รับพรอพ post ให้ใช้ข้อมูลนั้น
  // มิฉะนั้น ให้ใช้ข้อมูลโพสต์ที่กำหนดค่าไว้ล่วงหน้า
  const isCustomPost = !!post;
  // เพิ่มการตรวจสอบว่าโพสต์นี้เป็นโพสต์โปรโมชั่นหรือไม่
  const isPromoPost = isCustomPost && post.isPromoPost;

  // ฟังก์ชันจัดการเมื่อคลิกที่ปุ่มลงทะเบียนเท่านั้น
  const handleRegisterClick = (e) => {
    e.stopPropagation(); // ป้องกันการทริกเกอร์ event อื่นๆ
    if (isPromoPost && post.linkedTripId) {
      navigate(`/register/${post.linkedTripId}`);
    }
  };

  // ฟังก์ชันคำนวณเวลาอย่างง่าย
  const getSimpleTimeDisplay = useCallback(() => {
    if (!isCustomPost) return "5 ชั่วโมงที่แล้ว";
    
    try {
      // ใช้เวลาปัจจุบันลบกับเวลาที่โพสต์
      const now = new Date().getTime();
      
      // หาเวลาที่โพสต์ (ทั้งแบบใหม่และเก่า)
      let postTime = 0;
      if (post.timestamp) postTime = post.timestamp;
      else if (post.createdAt) postTime = new Date(post.createdAt).getTime();
      else return "เมื่อสักครู่";
      
      // คำนวณความแตกต่าง
      const diffMs = now - postTime;
      const diffSec = Math.floor(diffMs / 1000);
      
      // แปลงเป็นข้อความที่เข้าใจง่าย
      if (diffSec < 60) return "เมื่อสักครู่";
      
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`;
      
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour} ชั่วโมงที่แล้ว`;
      
      const diffDay = Math.floor(diffHour / 24);
      return `${diffDay} วันที่แล้ว`;
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการคำนวณเวลา:", error);
      return "เมื่อสักครู่";
    }
  }, [isCustomPost, post]);

  // ฟังก์ชันสำหรับจัดการการกดถูกใจ
  const handleLikeClick = (e) => {
    e.stopPropagation(); // ป้องกันการเปิดหน้าลงทะเบียน (กรณีเป็นโพสต์โปรโมชั่น)
    if (isLiked) {
      setLikeCount(prevCount => prevCount - 1);
    } else {
      setLikeCount(prevCount => prevCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // อัพเดทเวลาเมื่อ component โหลดและทุก 15 วินาที
  useEffect(() => {
    // ฟังก์ชันอัพเดทเวลา
    const updateTime = () => {
      const timeText = getSimpleTimeDisplay();
      setDisplayedTime(timeText);
    };
    
    // อัพเดทเวลาทันทีเมื่อโหลด
    updateTime();
    
    // ตั้ง interval อัพเดททุก 15 วินาที
    const timer = setInterval(updateTime, 15000);
    
    // ล้าง interval เมื่อ component unmount
    return () => clearInterval(timer);
  }, [getSimpleTimeDisplay]); // dependency เป็น getSimpleTimeDisplay เพื่อให้ re-run เมื่อฟังก์ชันเปลี่ยน

  // ฟังก์ชันสำหรับเปิด/ปิดเมนูตัวเลือก
  const toggleOptions = (e) => {
    e.stopPropagation(); // ป้องกันการคลิกที่จะไปทริกเกอร์เหตุการณ์อื่น
    setShowOptions(!showOptions);
  };

  // ฟังก์ชันสำหรับลบโพสต์
  const handleDeletePost = async (e) => {
    e.stopPropagation(); // ป้องกันการเปิดหน้าลงทะเบียน (กรณีเป็นโพสต์โปรโมชั่น)
    
    // ถ้าเป็นโพสต์เริ่มต้น (hardcoded) ไม่ต้องทำอะไร
    if (!isCustomPost) {
      alert("ไม่สามารถลบโพสต์เริ่มต้นได้");
      setShowOptions(false);
      return;
    }

    // ยืนยันการลบ
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?")) {
      setShowOptions(false);
      return;
    }

    setIsDeleting(true);
    
    try {
      // ส่งคำขอลบไปยัง API
      await axios.delete(`http://localhost:8080/api/posts/${post.id}`);
      
      // แจ้งเตือนว่าลบสำเร็จ
      alert("ลบโพสต์เรียบร้อยแล้ว");
      
      // แจ้งให้คอมโพเนนต์หลักทราบว่าโพสต์ถูกลบแล้ว
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบโพสต์:", error);
      alert("ไม่สามารถลบโพสต์ได้ โปรดลองอีกครั้งในภายหลัง");
    } finally {
      setIsDeleting(false);
      setShowOptions(false);
    }
  };

  // ฟังก์ชันจัดการกับข้อผิดพลาดของรูปภาพ
  const handleImageError = () => {
    setImageError(true);
  };

  // คำนวณ URL สำหรับรูปภาพ
  const getImageUrl = useCallback(() => {
    if (!isCustomPost) {
      return ImgKhaoYai; // รูปเริ่มต้นสำหรับโพสต์ hardcoded
    }
    
    if (!post.imageUrl) {
      return null; // ไม่แสดงรูปถ้าไม่มี URL
    }
    
    // ตรวจสอบว่า URL เป็นแบบเต็มหรือแบบย่อ
    if (post.imageUrl.startsWith('http://') || post.imageUrl.startsWith('https://')) {
      return post.imageUrl; // URL เต็ม (อาจมาจากแหล่งภายนอก)
    }  if (post.imageUrl.startsWith('/api/')) {
      return `http://localhost:8080${post.imageUrl}`; // URL จาก API ของเรา
    } else {
      // อาจเป็นแค่ชื่อไฟล์ ให้เติม base URL
      return `http://localhost:8080/api/files/${post.imageUrl}`;
    }
  }, [isCustomPost, post]);

  // ปิดเมนูตัวเลือกเมื่อคลิกที่อื่น
  useEffect(() => {
    const handleClickOutside = () => {
      if (showOptions) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showOptions]);

  // ส่วนของการแสดงผล
  return (
    <div 
      className="post"
      ref={ref} // เพิ่ม ref ที่รับมาจาก forwardRef
      style={{ 
        // เพิ่มสไตล์สำหรับโพสต์โปรโมชั่น
        border: isPromoPost ? '2px solid #4a7a4e' : 'none',
        position: 'relative',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* แสดงแบนเนอร์สำหรับโพสต์โปรโมชั่น */}
      {isPromoPost && (
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: '#4a7a4e',
          color: 'white',
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: 'bold',
          borderBottomLeftRadius: '8px'
        }}>
          โปรโมชั่น
        </div>
      )}
      
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={Image} alt="User profile" />
            <span className="postUsername">{isCustomPost ? post.username : "golden"}</span>
            <span className="postDate">{displayedTime}</span>
          </div>
          
          <div className="postTopRight">
            <div className="moreOptions" onClick={toggleOptions}>
              <MoreVert style={{ cursor: 'pointer' }} />
              
              {/* เมนูตัวเลือกเมื่อคลิกที่ไอคอน 3 ขีด */}
              {showOptions && (
                <div className="optionsMenu" onClick={(e) => e.stopPropagation()}>
                  <div 
                    className="optionItem" 
                    onClick={handleDeletePost}
                    style={{
                      position: 'absolute',
                      right: '0',
                      backgroundColor: 'white',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      zIndex: 10,
                      cursor: 'pointer'
                    }}
                  >
                    {isDeleting ? "กำลังลบ..." : "ลบโพสต์"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="postCenter">
          <span className="postText">
            {isCustomPost ? post.text : "หาเพื่อนเที่ยวเขาใหญ่ครับ กลุ่มผมมีทั้งหมด 17 คนแล้ว ต้องการอีก 3 คน ด่วน!"}
          </span>
          
          {/* แสดงรูปภาพเฉพาะเมื่อมีรูปภาพและยังไม่มีข้อผิดพลาด */}
          {(!isCustomPost || (post.imageUrl && !imageError)) && (
            <img 
              className="postImg" 
              src={isCustomPost ? getImageUrl() : ImgKhaoYai} 
              alt="Post image" 
              onError={handleImageError}
            />
          )}
          
          {/* แสดงข้อความเพิ่มเติมสำหรับโพสต์โปรโมชั่น */}
          {isPromoPost && (
            <div style={{
              backgroundColor: '#f0f8f1',
              padding: '10px',
              borderRadius: '8px',
              marginTop: '10px',
              border: '1px dashed #4a7a4e',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#4a7a4e' }}>
                  {post.promoTitle} {post.promoDiscount}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  คลิกปุ่มลงทะเบียนเพื่อจองทริป
                </div>
              </div>
              <button 
                onClick={handleRegisterClick} 
                style={{
                  backgroundColor: '#4a7a4e',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#3a5a3e'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4a7a4e'}
              >
                ลงทะเบียน
              </button>
            </div>
          )}
        </div>
        
        <div className="postBottom">
          <div className="postBottomLeft">
            <img 
              className={`likeIcon ${isLiked ? 'liked' : ''}`} 
              src={Like} 
              alt="Like icon" 
              onClick={handleLikeClick}
              style={{ cursor: 'pointer' }}
            />
            <img 
              className="likeIcon" 
              src={Love} 
              alt="Love icon" 
              onClick={handleLikeClick}
              style={{ cursor: 'pointer' }}
            />
            <span className="postLikeCounter">{likeCount} คนถูกใจสิ่งนี้</span>
          </div>
        </div>
        
        {/* เพิ่ม Comment Component */}
        <Comment postId={isCustomPost ? post.id : "default-post"} />
      </div>
    </div>
  );
});

export default Post;