import React, { useState, useEffect } from "react";
import axios from "axios";
import { PermMedia, Cancel, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../Component/SharePopup.css";
import Image from "../assets/golden.webp";

const SharePopup = ({ isOpen, onClose, promoData = null }) => {
  const navigate = useNavigate();
  const [text, setText] = useState(promoData ? 
    `ทริปแนะนำ: ${promoData.title} ${promoData.discount}\n${promoData.details}` : 
    "");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(promoData?.imageUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);

  // ถ้า Modal เปิดขึ้นมา ให้ล็อค scrolling ของ body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSelectImage = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // ตรวจสอบประเภทไฟล์ (รูปภาพเท่านั้น)
    if (!selectedFile.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }

    // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5 MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("ขนาดไฟล์ต้องไม่เกิน 5 MB");
      return;
    }

    setFile(selectedFile);
    setError("");

    // สร้าง URL สำหรับ preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(promoData?.imageUrl || null);
  };

  const closePopup = () => {
    setText("");
    setFile(null);
    setPreviewUrl(null);
    setError("");
    setIsSubmitting(false);
    setUploadProgress(0);
    setShowUploadProgress(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!text.trim() && !previewUrl) {
      setError("กรุณาใส่ข้อความหรือเลือกรูปภาพ");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setUploadProgress(0);
    
    try {
      let imageUrl = previewUrl;
      
      // อัปโหลดรูปภาพถ้ามีการเลือกไฟล์ใหม่
      if (file) {
        setShowUploadProgress(true);
        
        const formData = new FormData();
        formData.append("file", file);
        
        const uploadResponse = await axios.post(
          "http://localhost:8080/api/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            },
          }
        );
        
        imageUrl = uploadResponse.data.url;
      }
      
      // สร้างโพสต์
      const postData = {
        text: text,
        username: "golden", // ใช้ username คงที่ (ควรใช้จากระบบยืนยันตัวตน)
        imageUrl: imageUrl,
        timestamp: Date.now(),
      };
      
      // ถ้าเป็นการแชร์โปรโมชั่น ให้เพิ่มข้อมูลโปรโมชั่น
      if (promoData) {
        postData.isPromoPost = true;
        postData.linkedTripId = promoData.tripId;
        postData.promoTitle = promoData.title;
        postData.promoDiscount = promoData.discount;
      }
      
      // ส่งข้อมูลโพสต์ไปยัง API
      const response = await axios.post("http://localhost:8080/api/posts/newpost", postData);
      
      // เก็บ ID ของโพสต์ที่สร้าง
      const newPostId = response.data.id;
      
      // ปิด popup และนำทางไปยังหน้า Content พร้อมกับ ID ของโพสต์
      closePopup();
      
      // เก็บข้อมูลโพสต์ใน localStorage เพื่อใช้ในการเลื่อนไปยังโพสต์ในหน้า destinations
      localStorage.setItem('scrollToPost', newPostId);
      
      // นำทางไปยังหน้า Content (destinations)
      navigate('/destinations');
      
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างโพสต์:", error);
      setError("ไม่สามารถสร้างโพสต์ได้ โปรดลองอีกครั้งในภายหลัง");
      setIsSubmitting(false);
      setShowUploadProgress(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="sharePopupOverlay">
      <div className="sharePopupContent">
        {/* ส่วนหัวของ Popup */}
        <div className="sharePopupHeader">
          <h3>สร้างโพสต์</h3>
          <button className="closeButton" onClick={closePopup}>
            <Close />
          </button>
        </div>
        
        {/* ข้อมูลผู้โพสต์ */}
        <div className="sharePopupUser">
          <img src={Image} alt="Profile" className="shareProfileImg" />
          <span className="userName">golden</span>
        </div>
        
        {/* ส่วนเนื้อหาของโพสต์ */}
        <div className="sharePopupBody">
          <textarea
            placeholder="คุณกำลังคิดอะไรอยู่?"
            className="shareInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
          />
          
          {/* แสดงรูปภาพตัวอย่าง */}
          {previewUrl && (
            <div className="imagePreviewContainer">
              <img
                src={previewUrl}
                alt="Preview"
                className="imagePreview"
              />
              <button
                className="removeImageBtn"
                onClick={handleRemoveImage}
                disabled={isSubmitting}
              >
                <Cancel />
              </button>
            </div>
          )}
          
          {/* แสดงสถานะการอัปโหลด */}
          {showUploadProgress && (
            <div className="uploadProgressContainer">
              <div className="uploadProgressBar">
                <div
                  className="uploadProgressFill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="uploadProgressText">
                {uploadProgress < 100
                  ? `กำลังอัปโหลด ${uploadProgress}%`
                  : "อัปโหลดเสร็จสิ้น"}
              </span>
            </div>
          )}
          
          {/* แสดงข้อผิดพลาด */}
          {error && <div className="errorMessage">{error}</div>}
        </div>
        
        {/* ส่วนตัวเลือกเพิ่มเติม */}
        <div className="sharePopupOptions">
          <p>เพิ่มลงในโพสต์ของคุณ</p>
          <div className="shareOptions">
            <label className="shareOptionLabel" htmlFor="file">
              <div className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">รูปภาพ</span>
              </div>
              <input
                type="file"
                id="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleSelectImage}
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
        
        {/* ปุ่มโพสต์ */}
        <button
          className="sharePopupButton"
          onClick={handleSubmit}
          disabled={isSubmitting || (!text.trim() && !previewUrl)}
        >
          {isSubmitting ? "กำลังโพสต์..." : "โพสต์"}
        </button>
      </div>
    </div>
  );
};

export default SharePopup;