import React, { useState, useRef, useEffect } from 'react';
import "../Component/main.css";
import QRImage from "../assets/QR.jpg"; // Import the QR image from assets
import ExampleImage1 from "../assets/IMG_8437.jpeg"; // Import example slip 1
import ExampleImage2 from "../assets/IMG_8438.jpeg"; // Import example slip 2
import ImageModal from "./ImageModal"; // Import the ImageModal component

const PaymentConfirmation = ({ tripPrice, onPaymentComplete }) => {
  // Main state
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const fileInputRef = useRef(null);
  
  // State for the image modal
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // State for slip validation
  const [isValidSlip, setIsValidSlip] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [hasRejectedImage, setHasRejectedImage] = useState(false);

  // Example images
  const exampleImages = [
    { id: 1, src: ExampleImage1, alt: "สลิปกสิกรไทย", bank: "K PLUS" },
    { id: 2, src: ExampleImage2, alt: "สลิปไทยพาณิชย์", bank: "SCB EASY" }
  ];

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setError("");
    setIsValidSlip(false);
    setHasRejectedImage(false);
    
    if (!file) return;
    
    // Validate file type (image only)
    if (!file.type.startsWith('image/')) {
      setError("กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น");
      
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("ขนาดไฟล์ต้องไม่เกิน 5MB");
      return;
    }
    
    // Create preview URL
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      
      // Start validation process
      setIsValidating(true);
      
      // Validate bank slip
      validateBankSlip(fileReader.result, file);
    };
    fileReader.readAsDataURL(file);
    
    setPaymentSlip(file);
  };

  // Validate bank slip
  const validateBankSlip = (imageUrl, file) => {
    // Simulate validation process
    setTimeout(() => {
      setIsValidating(false);
      
      // Check if filename contains bank-related terms
      const fileName = file.name.toLowerCase();
      const isMobileScreenshot = /screenshot|capture|img|image|photo/i.test(fileName);
      const hasBankTerms = /slip|bank|transfer|receipt|transaction|payment|โอน|สลิป|ธนาคาร|เงิน/i.test(fileName);
      
      // Determine if valid slip
      if (hasBankTerms || isMobileScreenshot) {
        setIsValidSlip(true);
        setError("");
      } else {
        setIsValidSlip(false);
        setHasRejectedImage(true);
        setError("ไม่พบข้อมูลการโอนเงินในรูปภาพ กรุณาอัปโหลดสลิปการโอนเงินจากธนาคารเท่านั้น");
      }
    }, 1500);
  };
  
  // Remove uploaded file
  const handleRemoveFile = () => {
    setPaymentSlip(null);
    setPreviewUrl(null);
    setIsValidSlip(false);
    setError("");
    setHasRejectedImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // Confirm payment
  const handleConfirmPayment = () => {
    if (!paymentSlip) {
      setError("กรุณาแนบสลิปการโอนเงินก่อนยืนยันการชำระเงิน");
      return;
    }
    
    if (!isValidSlip) {
      setError("กรุณาแนบเฉพาะสลิปการโอนเงินจากธนาคารเท่านั้น ไม่สามารถใช้รูปภาพทั่วไปได้");
      return;
    }
    
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setConfirmed(true);
      
      // Navigate back to promotion page after 3 seconds
      if (onPaymentComplete) {
        setTimeout(() => {
          onPaymentComplete();
        }, 3000);
      } else {
        setTimeout(() => {
          window.location.href = '/holidays';
        }, 3000);
      }
    }, 1500);
  };
  
  // Handle cancel
  const handleCancel = () => {
    window.history.back();
  };

  // Open image modal
  const openImageModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  // Open a gallery of examples
  const openExampleGallery = () => {
    // Set all example images as gallery
    setGalleryImages(exampleImages.map(img => img.src));
    // Start with the first image
    setModalImage(exampleImages[0].src);
    setShowModal(true);
  };

  // Style for keyboard navigation hint
  useEffect(() => {
    // Add CSS for the animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="register-container" style={{ maxWidth: "500px" }}>
      <div className="payment-header" style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#4a7a4e" }}>ชำระเงินค่าทริป</h2>
        <p>กรุณาสแกน QR Code เพื่อชำระเงิน</p>
      </div>
      
      <div className="qr-payment-card" style={{
        backgroundColor: "#1e3a5f",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
      }}>
        {/* THAI QR PAYMENT HEADER */}
        <div style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px" }}>
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="15" width="70" height="70" rx="10" stroke="white" strokeWidth="8" fill="none" />
                <rect x="40" y="15" width="20" height="30" fill="white" />
                <rect x="15" y="40" width="30" height="20" fill="white" />
                <rect x="40" y="65" width="20" height="20" fill="#4ade80" />
              </svg>
            </div>
            <div style={{ color: "white", fontWeight: "bold" }}>
              <div>THAI QR</div>
              <div>PAYMENT</div>
            </div>
          </div>
        </div>
        
        {/* QR PAYMENT CONTENT */}
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* PROMPTPAY LOGO */}
          <div style={{ marginBottom: "15px" }}>
            <img 
              src="https://www.bot.or.th/Thai/PaymentSystems/PSServices/PromptPay/PublishingImages/PromptPay-introduction.jpg" 
              alt="PromptPay Logo" 
              style={{ height: "40px" }} 
            />
          </div>
          
          {/* QR CODE */}
          <div style={{ marginBottom: "20px" }}>
            <img 
              src={QRImage} 
              alt="QR Code" 
              style={{ width: "200px", height: "200px", cursor: "pointer" }}
              onClick={() => openImageModal(QRImage)}
            />
          </div>
          
          {/* PAYMENT INFO */}
          <div style={{ textAlign: "center", width: "100%" }}>
            <div style={{ color: "#2dd4bf", fontSize: "1.25rem", fontWeight: "500", marginBottom: "10px" }}>
              สแกน QR เพื่อโอนเข้าบัญชี
            </div>
            
            <div style={{ color: "#1f2937", fontSize: "1.125rem", fontWeight: "500", marginBottom: "5px" }}>
              ชื่อ: นาย พิจักษณ์ อสัมภินพงศ์
            </div>
            
            <div style={{ color: "#1f2937", fontSize: "1.125rem", fontWeight: "500", marginBottom: "5px" }}>
              บัญชี: xxx-x-x6026-x
            </div>
            
            <div style={{ color: "#9ca3af", fontSize: "1rem", marginBottom: "15px" }}>
              เลขที่อ้างอิง: 004999100920288
            </div>
            
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "15px", display: "flex", justifyContent: "center" }}>
              <div style={{ color: "#6b7280", fontSize: "0.875rem", display: "flex", alignItems: "center" }}>
                <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "5px" }}>
                  <rect x="5" y="5" width="30" height="90" fill="#22c55e" />
                  <path d="M50 20L90 80" stroke="#22c55e" strokeWidth="10" />
                  <path d="M60 20L80 50" stroke="#22c55e" strokeWidth="10" />
                </svg>
                <span>Accepts all banks | รับเงินได้จากทุกธนาคาร</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>ยอดที่ต้องชำระ: <strong>{tripPrice || "โปรดตรวจสอบราคาจากโปรโมชัน"}</strong></p>
        
        {/* ข้อความเตือนสีแดง */}
        <div style={{ 
          backgroundColor: "#ffebee", 
          padding: "12px 15px", 
          borderRadius: "5px", 
          margin: "20px 0", 
          borderLeft: "4px solid #e53935",
          textAlign: "left"
        }}>
          <p style={{ 
            color: "#c62828", 
            margin: 0, 
            fontWeight: "bold",
            fontSize: "14px"
          }}>
            <span style={{ marginRight: "5px" }}>⚠️</span> กรุณาแนบเฉพาะสลิปการโอนเงินจากธนาคารเท่านั้น
          </p>
          <p style={{ 
            color: "#c62828", 
            margin: "5px 0 0 0", 
            fontSize: "12px" 
          }}>
            ระบบจะตรวจสอบว่ารูปภาพที่อัปโหลดเป็นสลิปโอนเงินจากแอปธนาคารหรือไม่
          </p>
        </div>
        
        {/* ส่วนอัปโหลดสลิป */}
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
            แนบสลิปการชำระเงิน <span style={{ color: "red" }}>*</span>
          </p>
          
          {paymentSlip ? (
            <div style={{ position: "relative", border: "1px solid #ddd", borderRadius: "8px", padding: "8px", marginBottom: "10px" }}>
              <img 
                src={previewUrl} 
                alt="ตัวอย่างสลิปการชำระเงิน "
                style={{ width: "100%", height: "200px", objectFit: "contain", borderRadius: "4px", cursor: "pointer" }}
                onClick={() => openImageModal(previewUrl)}
              />
              
              
              <button
                onClick={handleRemoveFile}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10
                }}
              >
                ✕
              </button>
              
              {isValidating && (
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  backgroundColor: "rgba(255,255,255,0.9)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  flexDirection: "column",
                  zIndex: 5
                }}>
                  <div style={{ 
                    width: "35px", 
                    height: "35px", 
                    borderRadius: "50%", 
                    border: "4px solid #38761d", 
                    borderTopColor: "transparent", 
                    animation: "spin 1s linear infinite" 
                  }}></div>
                  <p style={{ 
                    marginTop: "15px", 
                    color: "#38761d", 
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>
                    กำลังตรวจสอบสลิป...
                  </p>
                  <p style={{ 
                    marginTop: "5px", 
                    color: "#666", 
                    fontSize: "14px",
                    textAlign: "center",
                    maxWidth: "80%"
                  }}>
                    ระบบกำลังตรวจสอบว่าเป็นสลิปการโอนเงินจากธนาคารหรือไม่
                  </p>
                </div>
              )}
              
              {isValidSlip && !isValidating && (
                <div style={{ 
                  position: "absolute", 
                  top: "10px", 
                  left: "10px", 
                  backgroundColor: "rgba(56, 142, 60, 0.9)", 
                  color: "white", 
                  padding: "5px 10px", 
                  borderRadius: "4px", 
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 5
                }}>
                  <span style={{ marginRight: "5px" }}>✓</span> สลิปถูกต้อง
                </div>
              )}
              
              {!isValidSlip && !isValidating && hasRejectedImage && (
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  backgroundColor: "rgba(211, 47, 47, 0.1)", 
                  borderRadius: "4px",
                  border: "2px solid rgba(211, 47, 47, 0.5)",
                  zIndex: 4
                }}>
                  <div style={{ 
                    position: "absolute", 
                    top: "10px", 
                    left: "10px", 
                    backgroundColor: "rgba(211, 47, 47, 0.9)", 
                    color: "white", 
                    padding: "5px 10px", 
                    borderRadius: "4px", 
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    zIndex: 5
                  }}>
                    <span style={{ marginRight: "5px" }}>✕</span> ไม่ใช่สลิปธนาคาร
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current.click()}
              style={{
                border: "2px dashed #ddd",
                borderRadius: "8px",
                padding: "30px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f9f9f9"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", color: "#aaa" }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p style={{ marginTop: "10px", color: "#666", fontWeight: "bold" }}>คลิกเพื่ออัปโหลดสลิปการโอนเงิน</p>
              <p style={{ fontSize: "0.8rem", color: "#999" }}>รองรับไฟล์ JPG, PNG (ไม่เกิน 5MB)</p>
              
              {/* ตัวอย่างสลิปธนาคาร */}
              <div style={{ 
                marginTop: "15px", 
                borderTop: "1px dashed #ddd", 
                paddingTop: "15px" 
              }}>
                <p style={{ fontSize: "0.9rem", color: "#4a7a4e", fontWeight: "bold" }}>
                  ตัวอย่างสลิปธนาคารที่ถูกต้อง:
                  <span 
                    style={{ 
                      marginLeft: "5px", 
                      color: "#38761d", 
                      cursor: "pointer", 
                      textDecoration: "underline" 
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openExampleGallery();
                    }}
                  >
                    
                    (คลิกเพื่อดูตัวอย่าง)
                    (ใข้ได้แค่ 2 ธนาคาร คือ K PLUS กับ SCB EASY)
                  </span>
                </p>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  marginTop: "10px", 
                  flexWrap: "wrap", 
                  gap: "10px" 
                }}>
                  {/* ตัวอย่างที่ 1 */}
                  <div 
                    style={{ 
                      width: "125px", 
                      border: "1px solid #ddd", 
                      borderRadius: "4px",
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(ExampleImage1);
                    }}
                  >
                    <div style={{ 
                      backgroundColor: "#00A261", 
                      color: "white", 
                      fontSize: "10px", 
                      padding: "2px 0", 
                      textAlign: "center", 
                      fontWeight: "bold"
                    }}>
                      K PLUS
                    </div>
                    <img 
                      src={ExampleImage1}
                      alt="สลิปกสิกรไทย" 
                      style={{ 
                        width: "100%", 
                        height: "180px", 
                        objectFit: "cover" 
                      }} 
                    />
                  </div>
                  
                  {/* ตัวอย่างที่ 2 */}
                  <div 
                    style={{ 
                      width: "125px", 
                      border: "1px solid #ddd", 
                      borderRadius: "4px",
                      overflow: "hidden",
                      cursor: "pointer"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openImageModal(ExampleImage2);
                    }}
                  >
                    <div style={{ 
                      backgroundColor: "#1E4598", 
                      color: "white", 
                      fontSize: "10px", 
                      padding: "2px 0", 
                      textAlign: "center", 
                      fontWeight: "bold"
                    }}>
                      SCB EASY
                    </div>
                    <img 
                      src={ExampleImage2}
                      alt="สลิปไทยพาณิชย์" 
                      style={{ 
                        width: "100%", 
                        height: "180px", 
                        objectFit: "cover" 
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: "none" }}
          />
          
          {error && (
            <div style={{ 
              color: "#e11d48", 
              marginTop: "10px", 
              fontSize: "0.9rem", 
              backgroundColor: "#fff1f2", 
              padding: "10px 12px", 
              borderRadius: "4px", 
              border: "1px solid #fecdd3",
              display: "flex",
              alignItems: "flex-start"
            }}>
              <span style={{ marginRight: "8px", fontSize: "16px" }}>⚠️</span>
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>{error}</p>
                {hasRejectedImage && (
                  <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>
                    โปรดตรวจสอบว่ารูปภาพที่แนบเป็นสลิปการโอนเงินจากธนาคารจริงๆ หรือเปลี่ยนไปใช้รูปอื่นที่เป็นสลิปธนาคาร
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: "30px" }}>
          <button
            onClick={handleConfirmPayment}
            className="comment-submit"
            style={{
              backgroundColor: confirmed ? "#4caf50" : "#38761d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "12px 20px",
              fontSize: "16px",
              cursor: isValidSlip && paymentSlip && !uploading && !confirmed ? "pointer" : "not-allowed",
              fontWeight: "500",
              marginRight: "10px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "150px",
              opacity: isValidSlip && paymentSlip && !uploading && !confirmed ? 1 : 0.6
            }}
            disabled={!isValidSlip || !paymentSlip || uploading || confirmed}
          >
            {uploading ? (
              <>
                <span style={{ display: "inline-block", width: "16px", height: "16px", borderRadius: "50%", border: "2px solid white", borderTopColor: "transparent", marginRight: "8px", animation: "spin 1s linear infinite" }} />
                กำลังอัปโหลด...
              </>
            ) : confirmed ? (
              <>
                <span style={{ marginRight: "8px" }}>✓</span>
                ชำระเงินสำเร็จ
              </>
            ) : (
              "ยืนยันการชำระเงิน"
            )}
          </button>
          
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "12px 20px",
              fontSize: "16px",
              cursor: uploading || confirmed ? "not-allowed" : "pointer",
              fontWeight: "500",
              display: "inline-block",
              minWidth: "150px",
              opacity: uploading || confirmed ? 0.6 : 1
            }}
            disabled={uploading || confirmed}
          >
            กลับไปแก้ไขข้อมูล
          </button>
        </div>
        
        {/* ข้อความแสดงเมื่อสำเร็จ */}
        {confirmed && (
          <div style={{ 
            marginTop: "20px", 
            padding: "15px", 
            backgroundColor: "#f0fdf4", 
            border: "1px solid #bbf7d0", 
            borderRadius: "8px", 
            color: "#166534",
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "10px", fontWeight: "bold", fontSize: "20px" }}>✓</span>
            <div>
              <p style={{ margin: "0", fontWeight: "bold" }}>ยืนยันการชำระเงินสำเร็จ!</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem" }}>กำลังนำคุณกลับไปยังหน้าโปรโมชั่น...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Image Modal Component */}
      {showModal && (
        <ImageModal 
          imageUrl={modalImage}
          galleryImages={galleryImages.length > 0 ? galleryImages : [modalImage]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentConfirmation;