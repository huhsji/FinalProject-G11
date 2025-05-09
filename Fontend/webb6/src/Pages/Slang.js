import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import "../Component/Scroll.css";
import "../Component/Text.css";
import "../Component/Background.css";
import "../Component/Button.css";
import "../Component/Scrollgallery.css";
import ImageModal from "./ImageModal"; // นำเข้าคอมโพเนนต์ ImageModal ที่สร้างใหม่

function Third() {
  const navigate = useNavigate();
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [showImage4, setShowImage4] = useState(false);
  const [showImage5, setShowImage5] = useState(false);
  const [showImage6, setShowImage6] = useState(false);
  // เพิ่มสถานะสำหรับเก็บรูปที่เลือกเพื่อแสดงขนาดใหญ่
  const [selectedImage, setSelectedImage] = useState(null);

  // สร้างเส้นทางรูปภาพแบบ URL สัมพัทธ์ 
  const imgPath = '/images/Slang/';

  // ฟังก์ชันสำหรับเปิดรูปภาพขนาดใหญ่
  const openFullImage = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // ฟังก์ชันสำหรับปิดรูปภาพขนาดใหญ่
  const closeFullImage = () => {
    setSelectedImage(null);
  };
  
  // ฟังก์ชันสำหรับไปยังหน้าโปรโมชั่น
  const goToPromotions = () => {
    navigate('/holidays');
  };
  
  // ฟังก์ชันสำหรับย้อนกลับ
  const goBack = () => {
    navigate(-1); // ย้อนกลับไปหน้าที่แล้ว
  };

  return (
    <div className="Navbar" style={{ position: 'relative' }}>
      <NavigationBar />
      <div className="Text">
        {/* ปุ่มย้อนกลับตามภาพ (วงกลมสีดำ) */}
        <div style={{ 
          position: 'absolute', 
          top: '125px', 
          left: '40px', 
          zIndex: 10 
        }}>
          <button 
            onClick={goBack}
            style={{
              padding: '8px 15px',
              backgroundColor: '#4caf50',  // สีเขียว
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '5px' }}>&#8592;</span> ย้อนกลับ
          </button>
        </div>
        
        <h1>รายละเอียดการเดินป่า</h1>
        <p>อุทยานทุ่งแสลงหลวง</p>

        <div className="Text3">
          <h1>รายละเอียดอุทยานทุ่งแสลงหลวง</h1>
        </div>

        <div className="scroll-container">
          <div className="Text2" style={{ position: 'relative', paddingBottom: '60px' }}>

            <h2>แผนที่</h2>
            <div className="image-container">
              <img 
                src={`${imgPath}Slang2.jpg`} 
                alt="Hiking Image" 
                onClick={() => openFullImage(`${imgPath}Slang2.jpg`)}
                style={{ cursor: 'pointer' }}
              />
            </div>

            <h2>สถานที่ท่องเที่ยวในอุทยานทุ่งแสลงหลวง</h2>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage1(!showImage1)}>Picture</button>
            </div>
            
            {showImage1 && (
              <div className="scroll-gallery">
                <img 
                  src={`${imgPath}slang.jpg`} 
                  alt="ทุ่งเเสลงหลวง" 
                  onClick={() => openFullImage(`${imgPath}slang.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Sopa.jpg`} 
                  alt="เเกงโสภา" 
                  onClick={() => openFullImage(`${imgPath}Sopa.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Paya.jpg`} 
                  alt="พญา" 
                  onClick={() => openFullImage(`${imgPath}Paya.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Star.jpg`} 
                  alt="ถ้ำเดือน" 
                  onClick={() => openFullImage(`${imgPath}Star.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Yen.jpg`} 
                  alt="วังน้ำเย็น" 
                  onClick={() => openFullImage(`${imgPath}Yen.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}wang.jpg`} 
                  alt="วังเเดง" 
                  onClick={() => openFullImage(`${imgPath}wang.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Rose.jpg`} 
                  alt="กุหลาบเเดง" 
                  onClick={() => openFullImage(`${imgPath}Rose.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Nozone.jpg`} 
                  alt="โนสน" 
                  onClick={() => openFullImage(`${imgPath}Nozone.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Sling.jpg`} 
                  alt="สลิง" 
                  onClick={() => openFullImage(`${imgPath}Sling.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}MOUT.jpg`} 
                  alt="เขาหมื่น" 
                  onClick={() => openFullImage(`${imgPath}MOUT.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ทุ่งแสลงหลวง</li>
              <li>น้ำตกแก่งโสภา</li>
              <li>ทุ่งนางพญาเมืองเลน</li>
              <li>ถ้ำเดือน - ถ้ำดาว</li>
              <li>แก่งวังน้ำเย็น</li>
              <li>ถ้ำพระวังแดง</li>
              <li>น้ำตกกุหลาบแดง</li>
              <li>ทุ่งโนนสน</li>
              <li>สะพานสลิง</li>
              <li>เขาล่องเรือตาหมื่น</li>
            </ul>

            <h2>เส้นทางเดินป่าและระดับความยาก</h2>

            <h3>เส้นทางเดินป่าทุ่งโนนสน</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage2(!showImage2)}>Picture</button>
            </div>
            
            {showImage2 && (
              <div className="scroll-gallery">
                <img 
                  src={`${imgPath}Sonun.jpg`} 
                  alt="ทุ่งโนนสน" 
                  onClick={() => openFullImage(`${imgPath}Sonun.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}So1.jpg`} 
                  alt="ทุ่งโนนสน" 
                  onClick={() => openFullImage(`${imgPath}So1.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}So2.jpg`} 
                  alt="ทุ่งโนนสน" 
                  onClick={() => openFullImage(`${imgPath}So2.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ระยะทาง: ประมาณ 8-9 กิโลเมตร</li>
              <li>ระยะเวลา: ประมาณ 3-4 ชั่วโมง</li>
              <li>ความยาก: เหมาะสำหรับผู้ที่มีประสบการณ์การเดินป่ามาบ้าง</li>
              <li>ลักษณะเส้นทาง: ทางขึ้น-ลงเขาเล็กน้อย</li>
              <li>หมายเหตุ: จำเป็นต้องมีเจ้าหน้าที่นำทาง</li>
            </ul>

            <h3>เส้นทางเดินป่าศึกษาธรรมชาติหนองแม่นา</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage3(!showImage3)}>Picture</button>
            </div>
            
            {showImage3 && (
              <div className="scroll-gallery">
                <img 
                  src={`${imgPath}nongtrail.jpg`} 
                  alt="หนองแม่นา" 
                  onClick={() => openFullImage(`${imgPath}nongtrail.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}nong2.jpg`} 
                  alt="หนองแม่นา" 
                  onClick={() => openFullImage(`${imgPath}nong2.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ระยะทาง: ประมาณ 6 กิโลเมตร</li>
              <li>ระยะเวลา: ประมาณ 3–4 ชั่วโมง </li>
              <li>ความยาก: เหมาะสำหรับผู้ที่มีประสบการณ์การเดินป่ามาบ้าง</li>
              <li>ลักษณะเส้นทาง: ผ่านป่าดิบชื้น ป่าสน ฯลฯ</li>
              <li>หมายเหตุ: จัดโดยชุมชนท้องถิ่นร่วมกับอุทยาน</li>
            </ul>

            <h3>เส้นทางเดินป่าทุ่งแสลงหลวง</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage4(!showImage4)}>Picture</button>
            </div>
            
            {showImage4 && (
              <div className="scroll-gallery">
                <img 
                  src={`${imgPath}Slang3.jpg`} 
                  alt="ทุ่งแสลงหลวง" 
                  onClick={() => openFullImage(`${imgPath}Slang3.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Luang2.jpg`} 
                  alt="ทุ่งแสลงหลวง" 
                  onClick={() => openFullImage(`${imgPath}Luang2.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ระยะทาง: ประมาณ 16 กิโลเมตร (ไป-กลับ)</li>
              <li>ระยะเวลา: ประมาณ 6–7 ชั่วโมง</li>
              <li>ความยาก: เหมาะสำหรับผู้มีประสบการณ์</li>
              <li>ลักษณะเส้นทาง: ทุ่งหญ้าสะวันนาและป่าสนสองใบ</li>
              <li>หมายเหตุ: ควรติดต่อเจ้าหน้าที่ล่วงหน้า</li>
            </ul>

            <h3>จุดชมวิว</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage5(!showImage5)}>Picture</button>
            </div>
            
            {showImage5 && (
              <div className="scroll-gallery">
                <img 
                  src={`${imgPath}kleaan.jpg`} 
                  alt="จุดชมวิว" 
                  onClick={() => openFullImage(`${imgPath}kleaan.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Wind.jpg`} 
                  alt="จุดชมวิว" 
                  onClick={() => openFullImage(`${imgPath}Wind.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Temple.jpg`} 
                  alt="จุดชมวิว" 
                  onClick={() => openFullImage(`${imgPath}Temple.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}Tawan.jpg`} 
                  alt="จุดชมวิว" 
                  onClick={() => openFullImage(`${imgPath}Tawan.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>จุดชมวิวเขาตะเคียนโง๊ะ</li>
              <li>ทุ่งกังหันลมเขาค้อ</li>
              <li>วัดพระธาตุผาซ่อนแก้ว</li>
              <li>จุดชมวิวผาเก็บตะวัน</li>
            </ul>

            <h2>ที่พัก</h2>
            <h2>สถานที่กางเต็นท์</h2>
            <p>จุดกางเต็นท์ในอุทยานแห่งชาติทุ่งแสลงหลวง</p>
            <ul>
              <li>ที่ตั้ง: ห่างจากที่ทำการอุทยานฯ ประมาณ 1 กิโลเมตร</li>
              <li>มีพื้นที่กางเต็นท์...</li>
              <li>การจอง: ติดต่ออุทยานล่วงหน้า</li>
            </ul>

            <h3>บ้านพัก</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage6(!showImage6)}>Picture</button>
            </div>
            
            {showImage6 && (
              <div className="scroll-gallery">
                <img 
                  src={`${imgPath}206.jpg`} 
                  alt="บ้านพัก" 
                  onClick={() => openFullImage(`${imgPath}206.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}207.jpg`} 
                  alt="บ้านพัก" 
                  onClick={() => openFullImage(`${imgPath}207.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src={`${imgPath}204.jpg`} 
                  alt="บ้านพัก" 
                  onClick={() => openFullImage(`${imgPath}204.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <p>บ้านพักภายในอุทยานฯ</p>
            <ul>
              <li>แสลงหลวง 206</li>
              <li>ลักษณะเหมาะสำหรับผู้สูงอายุและผู้พิการ</li>

              <p>สิ่งอำนวยความสะดวก:มีเครื่องนอน, พัดลม, 
                 เครื่องทำน้ำอุ่น, ตู้เย็น, กระติกน้ำร้อน,ทีวี,แอร์, 
                 ตู้เย็น, ผ้าเช็ดตัว, เครื่องปรับอากาศ, เครื่องทำน้ำอุ่น, 
                 โทรทัศน์, ตู้เย็น, เครื่องนอน 3.5 ฟุต, กระติกน้ำร้อน</p>
              
              <li>แสลงหลวง 207</li>
              
              <p>สิ่งอำนวยความสะดวก:มีเครื่องนอน, พัดลม, 
                เครื่องทำน้ำอุ่น, ตู้เย็น, กระติกน้ำร้อน, 
                เครื่องนอน 3.5 ฟุต, เครื่องปรับอากาศ, พัดลม, เครื่องทำน้ำอุ่น, 
                โทรทัศน์, ตู้เย็น, ผ้าเช็ดตัว, กระติกน้ำร้อน </p>
              
              <li>แสลงหลวง 204</li>
              
              <p>สิ่งอำนวยความสะดวก:มีเครื่องนอน, เครื่องทำน้ำอุ่น, 
                ตู้เย็น, กระติกน้ำร้อน, 
                ผ้าเช็ดตัว, ตู้เย็น ,แก้ว จาน ถ้วยกาแฟ</p>
            </ul>

            <h3>สุขา</h3>
            <p>ที่อุทยานฯ มีห้องน้ำให้บริการตามจุดต่าง ๆ เช่น</p>
            <ul>
              <li>จุดกางเต็นท์: หน่วยพิทักษ์ฯ สล.8</li>
              <li>บ้านพัก</li>
              <li>จุดชมวิว</li>
              <li>จุดบริการ</li>
              <li>คำแนะนำ: ควรเตรียมอุปกรณ์สุขอนามัยส่วนตัว</li>
            </ul>
            
            {/* ปุ่มไปยังหน้าโปรโมชั่น อยู่มุมขวาล่าง */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end', 
              marginTop: '30px'
            }}>
              <button 
                onClick={goToPromotions}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                ไปยังหน้าโปรโมชั่น
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ใช้คอมโพเนนต์ ImageModal เพื่อแสดงรูปภาพขนาดใหญ่ */}
      {selectedImage && (
        <ImageModal 
          imageUrl={selectedImage}
          onClose={closeFullImage}
        />
      )}
    </div>
  );
}

export default Third;