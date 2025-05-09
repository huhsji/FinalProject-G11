import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import "../Component/Scroll.css";
import "../Component/Text.css";
import "../Component/Background.css";
import "../Component/Button.css";
import "../Component/Scrollgallery.css";
import ImageModal from "./ImageModal";

function Main() {
    const navigate = useNavigate();
    const [showImage1, setShowImage1] = useState(false);
    const [showImage2, setShowImage2] = useState(false);
    const [showImage3, setShowImage3] = useState(false);
    const [showImage4, setShowImage4] = useState(false);
    const [showImage5, setShowImage5] = useState(false);
    const [showImage6, setShowImage6] = useState(false);
    const [showImage7, setShowImage7] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
   
    // สร้างเส้นทางรูปภาพแบบ URL สัมพัทธ์ 
    const imgPath = '/images/KhoaYai/';

    // เปิดรูปภาพแบบเต็มหน้าจอ
    const openFullImage = (imageSrc) => {
      setSelectedImage(imageSrc);
    };

    // ปิดรูปภาพแบบเต็มหน้าจอ
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
          <p> อุทยานแห่งชาติเขาใหญ่ </p>
  
          <div className="Text3">
            <h1>รายละเอียดอุทยานเขาใหญ่ แห่งชาติ</h1>
          </div>
          
          {/* Container ที่มี Scroll */}
          <div className="scroll-container">
            <div className="Text2" style={{ position: 'relative', paddingBottom: '60px' }}>
             
              <h2>แผนที่</h2>
  
              {/* แสดงภาพแผนที่ */}
              <div className="image-container">
                <img 
                  src={`${imgPath}KhoaYai.jpg`} 
                  alt="Hiking Image" 
                  onClick={() => openFullImage(`${imgPath}KhoaYai.jpg`)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
  
              <h2>สถานที่ท่องเที่ยวในเขาใหญ่</h2> 
              
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage1(!showImage1)}>Picture</button>
              </div>
              
              {showImage1 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}WaterfallHell.jpg`} 
                    alt="น้ำตกเหวนรก" 
                    onClick={() => openFullImage(`${imgPath}WaterfallHell.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Banana.jpg`} 
                    alt="น้ำตกผากล้วยไม้" 
                    onClick={() => openFullImage(`${imgPath}Banana.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Suwat.jpg`} 
                    alt="น้ำตกเหวสุวัต" 
                    onClick={() => openFullImage(`${imgPath}Suwat.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Night.jpg`} 
                    alt="ส่องสัตว์เขาใหญ่" 
                    onClick={() => openFullImage(`${imgPath}Night.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}helside.jpg`} 
                    alt="น้ำตกเหวไทร" 
                    onClick={() => openFullImage(`${imgPath}helside.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
             
             <ul>
                <li>น้ำตกเหวนรก</li>
                <li>น้ำตกผากล้วยไม้</li>
                <li>น้ำตกเหวสุวัต</li>
                <li>ส่องสัตว์เขาใหญ่</li>
                <li>น้ำตกเหวไทร</li>
              </ul>
  
              <h2>เส้นทางเดินป่าและระดับความยาก</h2>
              
              <h3>หนองผักชี กม.33 </h3>
                
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage2(!showImage2)}>Picture</button>
              </div>
              
              {showImage2 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}Pakshee.jpg`} 
                    alt="หนองผักชี กม.33" 
                    onClick={() => openFullImage(`${imgPath}Pakshee.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Pakshee2.jpg`} 
                    alt="หนองผักชี กม.33" 
                    onClick={() => openFullImage(`${imgPath}Pakshee2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
              
              <ul>
                <li>ระยะทาง: ประมาณ 3 กิโลเมตร</li>
                <li>ระยะเวลา: ประมาณ 2-3 ชั่วโมง</li>
                <li>ความยาก: ยาก</li>
              </ul>
  
              <h3>เส้นทางเดินป่าผาเดียวดาย</h3>
              
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage3(!showImage3)}>Picture</button>
              </div>
              
              {showImage3 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}Dry.jpg`} 
                    alt="เส้นทางเดินป่าผาเดียวดาย" 
                    onClick={() => openFullImage(`${imgPath}Dry.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Dry2.jpg`} 
                    alt="เส้นทางเดินป่าผาเดียวดาย" 
                    onClick={() => openFullImage(`${imgPath}Dry2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
              
              <ul>
                <li>ระยะทาง: ประมาณ 7 กิโลเมตร</li>
                <li>ระยะเวลา: ประมาณ 4-5 ชั่วโมง</li>
                <li>ความยาก: สูง</li>
                <li>จุดเด่น: เป็นเส้นทางที่เหมาะสำหรับนักเดินป่าที่มีประสบการณ์</li>
              </ul>
              
              <h3>เส้นทางน้ำตกเหวสุวัต</h3>
              
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage4(!showImage4)}>Picture</button>
              </div>
              
              {showImage4 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}Suwat.jpg`} 
                    alt="เส้นทางน้ำตกเหวสุวัต" 
                    onClick={() => openFullImage(`${imgPath}Suwat.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Helsuwat2.jpg`} 
                    alt="เส้นทางน้ำตกเหวสุวัต2" 
                    onClick={() => openFullImage(`${imgPath}Helsuwat2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
              
              <ul>
                <li>ระยะทาง: ประมาณ 1.5 กิโลเมตร</li>
                <li>ระยะเวลา: ประมาณ 1 ชั่วโมง</li>
                <li>ความยาก: ง่าย</li>
                <li>จุดเด่น: สามารถชมความงามของน้ำตกเหวสุวัต</li>
              </ul>
              
              <h3>อุปกรณที่ควรเตรียมไป</h3>
              <ul>
                <li>เสื้อผ้า</li>
                <li>เสื้อกันฝนหรือเสื้อกันลม</li>
                <li>รองเท้าเดินป่า</li>
                <li>กระเป๋าเป้เดินป่า (ควรเลือกแบบกันน้ำและรองรับน้ำหนักได้ดี)</li>
                <li>ชุดปฐมพยาบาล</li>
                <li>น้ำดื่ม (อย่างน้อย 2 ลิตร)</li>
                <li>แผนที่หรือ GPS (สำคัญมากสำหรับเส้นทางที่ไม่คุ้นเคย)</li>
                <li>Power Bank (ควรพกสำรองเพื่อชาร์จโทรศัพท์ในกรณีฉุกเฉิน)</li>
              </ul>
              
              <h3>จุดชมวิว</h3>
              
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage5(!showImage5)}>Picture</button>
              </div>
              
              {showImage5 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}ViewDry.jpg`} 
                    alt="ชมวิวผาเดียวดาย" 
                    onClick={() => openFullImage(`${imgPath}ViewDry.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Tromjai1.jpg`} 
                    alt="ผาตรอมใจ"
                    onClick={() => openFullImage(`${imgPath}Tromjai1.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Tromjai2.jpg`} 
                    alt="ผาตรอมใจ2"
                    onClick={() => openFullImage(`${imgPath}Tromjai2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Tower.jpg`} 
                    alt="หอ"
                    onClick={() => openFullImage(`${imgPath}Tower.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Tower2.jpg`} 
                    alt="หอ2"
                    onClick={() => openFullImage(`${imgPath}Tower2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
              
              <ul>
                <li>จุดชมวิวผาเดียวดาย</li>
                <li>จุดชมวิวผาตรอมใจ</li>
                <li>หอดูสัตว์หนองผักชี</li>
              </ul>
            
              <h2>ที่พัก</h2>
              <h2>สถานที่กางเต็นท์</h2>
              <ul>
                <li>ลานกางเต็นท์ลำตะคอง </li>
                <li>ลานกางเต็นท์ผากล้วยไม้</li>
                <li>ลานกางเต็นท์จุดชมวิวเขาร่ม</li>
              </ul>
  
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage6(!showImage6)}>Picture</button>
              </div>
              
              {showImage6 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}Takong.jpg`} 
                    alt="ลำตะคอง" 
                    onClick={() => openFullImage(`${imgPath}Takong.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Banana1.jpg`} 
                    alt="ผากล้วยไม้" 
                    onClick={() => openFullImage(`${imgPath}Banana1.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Banana2.jpg`} 
                    alt="ผากล้วยไม้2" 
                    onClick={() => openFullImage(`${imgPath}Banana2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Umbell.jpg`} 
                    alt="เขาร่ม" 
                    onClick={() => openFullImage(`${imgPath}Umbell.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
              
              <p>ลานกางเต็นท์ลำตะคอง</p>
              
              <ul>
                <li>รายละเอียด: ลานกางเต็นท์ลำตะคองเป็นสนามหญ้าเปิดโล่งขนาดใหญ่ริมแม่น้ำ บรรยากาศร่มรื่นและใกล้ชิดธรรมชาติ มักพบเห็นสัตว์ป่า เช่น นาก ลิง ชะนี และกวางป่า​</li>
                <li>สิ่งอำนวยความสะดวก: มีห้องน้ำและสิ่งอำนวยความสะดวกพื้นฐานสำหรับนักท่องเที่ยว ​</li>
                <li>ค่าบริการกางเต็นท์: ผู้ใหญ่ คนละ 30 บาท/คืน (ยังไม่รวมค่าเข้าอุทยาน)​</li>
                <li>หมายเหตุ: นักท่องเที่ยวต้องนำเต็นท์มาเอง หรือสามารถเช่าเต็นท์และอุปกรณ์จากอุทยานได้​​</li>
              </ul>
              
              <p>ลานกางเต็นท์ผากล้วยไม้</p>
              
              <ul>
                <li>รายละเอียด: ลานกางเต็นท์ผากล้วยไม้ตั้งอยู่ใกล้น้ำตกผากล้วยไม้ บรรยากาศเงียบสงบและใกล้ชิดธรรมชาติ​​</li>
                <li>สิ่งอำนวยความสะดวก:  มีห้องน้ำและสิ่งอำนวยความสะดวกพื้นฐานสำหรับนักท่องเที่ยว​​</li>
                <li>ค่าบริการกางเต็นท์: ผู้ใหญ่ คนละ 30 บาท/คืน (ยังไม่รวมค่าเข้าอุทยาน)​</li>
                <li>หมายเหตุ:นักท่องเที่ยวต้องนำเต็นท์มาเอง หรือสามารถเช่าเต็นท์และอุปกรณ์จากอุทยานได้​​</li>
              </ul>
              
              <p>ลานกางเต็นท์จุดชมวิวเขาร่ม</p>
              
              <ul>
                <li>รายละเอียด:ลานกางเต็นท์จุดชมวิวเขาร่มเป็นพื้นที่สำรอง เปิดให้บริการเฉพาะช่วงเทศกาล​</li>
                <li>หมายเหตุ: สำหรับการกางเต็นท์ในอุทยานแห่งชาติเขาใหญ่ นักท่องเที่ยวควรตรวจสอบข้อมูลและติดต่อเจ้าหน้าที่อุทยานล่วงหน้า เนื่องจากสถานะการเปิดให้บริการของลานกางเต็นท์อาจมีการเปลี่ยนแปลง​</li>
              </ul>
              
              <h3>บ้านพัก</h3>
              
              <p>บ้านพักให้บริการแก่นักท่องเที่ยวจำนวน 4 โซน ได้แก่ ศูนย์บริการนักท่องเที่ยว, โซนบนเขา-จุดชมวิว, โซนค่ายสุรัสวดี และโซนบ้านธนะรัชต์</p>
              
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage7(!showImage7)}>Picture</button>
              </div>
              
              {showImage7 && (
                <div className="scroll-gallery">
                  <img 
                    src={`${imgPath}Camp1.jpg`} 
                    alt="โซนค่ายสุรัสวดี" 
                    onClick={() => openFullImage(`${imgPath}Camp1.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src={`${imgPath}Camp2.jpg`} 
                    alt="โซนบ้านธนะรัชต์" 
                    onClick={() => openFullImage(`${imgPath}Camp2.jpg`)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
  
              <h3>สุขา</h3>
              <p>มีสุขาบริการตามจุดบริการนักท่องเที่ยว และบริเวณลานกางเต็นท์</p>
              
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

export default Main;