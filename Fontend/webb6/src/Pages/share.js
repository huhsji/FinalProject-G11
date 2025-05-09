import { useState, useEffect } from "react";
import axios from "axios";
import "../Component/share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Image from "../assets/golden.webp";
import SharePopup from "./SharePopup";

export default function Share() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ดึงข้อมูลโพสต์เมื่อคอมโพเนนต์ถูกโหลดและหลังจากสร้างโพสต์สำเร็จ
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.get("http://localhost:8080/api/posts/post");
      console.log("ดึงข้อมูลโพสต์:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์:", error);
      setError("ไม่สามารถโหลดโพสต์ได้ กรุณาลองอีกครั้งในภายหลัง");
    } finally {
      setIsLoading(false);
    }
  };

  // เปิดป๊อปอัปแชร์
  const handleOpenSharePopup = () => {
    setIsPopupOpen(true);
  };

  // ปิดป๊อปอัปและรีเฟรชโพสต์
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    fetchPosts(); // รีเฟรชโพสต์หลังจากปิดป๊อปอัป
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={Image} alt="Profile" />
          <input
            placeholder="คุณกำลังคิดอะไรอยู่?"
            className="shareInput"
            onClick={handleOpenSharePopup}
            readOnly // ทำให้เป็นแค่การเปิดป๊อปอัปแทนที่จะให้แก้ไขได้
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption" onClick={handleOpenSharePopup}>
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">รูปภาพหรือวิดีโอ</span>
            </div>
            <div className="shareOption" onClick={handleOpenSharePopup}>
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">แท็ก</span>
            </div>
            <div className="shareOption" onClick={handleOpenSharePopup}>
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">สถานที่</span>
            </div>
            <div className="shareOption" onClick={handleOpenSharePopup}>
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">ความรู้สึก</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleOpenSharePopup}>แชร์</button>
        </div>
      </div>
      
      {/* แสดงข้อความแจ้งเตือนข้อผิดพลาด */}
      {error && <div className="error-message" style={{color: 'red', margin: '10px 0', textAlign: 'center'}}>{error}</div>}
      
      {/* ตัวแสดงการโหลด */}
      {isLoading && <div className="loading-message" style={{textAlign: 'center', margin: '10px 0'}}>กำลังโหลดโพสต์...</div>}
      
      {/* คอมโพเนนต์ SharePopup */}
      <SharePopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
      />
    </div>
  );
}