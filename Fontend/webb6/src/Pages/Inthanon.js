import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from "./NavigationBar";
import "../Component/Scroll.css";
import "../Component/Text.css";
import "../Component/Background.css";
import "../Component/Button.css";
import "../Component/Scrollgallery.css";
import ImageModal from "./ImageModal"; // นำเข้าคอมโพเนนต์ ImageModal ที่สร้างใหม่

function Second() {
  const navigate = useNavigate();
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [showImage3, setShowImage3] = useState(false);
  const [showImage4, setShowImage4] = useState(false);
  const [showImage5, setShowImage5] = useState(false);
  const [showImage6, setShowImage6] = useState(false);
  const [showImage7, setShowImage7] = useState(false);
  const [showImage8, setShowImage8] = useState(false);
  // เพิ่มสถานะสำหรับเก็บรูปที่เลือกเพื่อแสดงขนาดใหญ่
  const [selectedImage, setSelectedImage] = useState(null);
  
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
        <p> อุทยานแห่งชาติดอยอินทนนท์ </p>

        <div className="Text3">
          <h1>รายละเอียดอุทยานดอยอินทนนท์</h1>
        </div>
        
        {/* Container ที่มี Scroll */}
        <div className="scroll-container">
          <div className="Text2" style={{ position: 'relative', paddingBottom: '60px' }}>
           
           <h2>แผนที่</h2>

            {/* แสดงภาพแผนที่ */}
            <div className="image-container">
              <img 
                src="images/inthanon/inthanon.jpg" 
                alt="Hiking Image" 
                onClick={() => openFullImage("images/inthanon/inthanon.jpg")}
                style={{ cursor: 'pointer' }}
              />
            </div>

            <h2>สถานที่ท่องเที่ยวในอุทยานดอยอินทนนท์</h2> 
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage1(!showImage1)}>Picture</button>
            </div>
            
            {showImage1 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/Gill.jpg" 
                  alt="สถานที่ท่องเที่ยว" 
                  onClick={() => openFullImage("images/inthanon/Gill.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/BathGa.jpg" 
                  alt="อ่างกา" 
                  onClick={() => openFullImage("images/inthanon/BathGa.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall1.jpg" 
                  alt="น้ำตกแท่นพระสังข์" 
                  onClick={() => openFullImage("images/inthanon/Waterfall1.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall2.jpg" 
                  alt="น้ำตกผาดอกเสี้ยว" 
                  onClick={() => openFullImage("images/inthanon/Waterfall2.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall3.jpg" 
                  alt="น้ำตกแม่กลาง" 
                  onClick={() => openFullImage("images/inthanon/Waterfall3.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall4.jpg" 
                  alt="น้ำตกแม่ปาน" 
                  onClick={() => openFullImage("images/inthanon/Waterfall4.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall5.jpg" 
                  alt="น้ำตกแม่ยะ" 
                  onClick={() => openFullImage("images/inthanon/Waterfall5.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall6.jpg" 
                  alt="น้ำตกวชิรธาร" 
                  onClick={() => openFullImage("images/inthanon/Waterfall6.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall7.jpg" 
                  alt="น้ำตกวังม่วง" 
                  onClick={() => openFullImage("images/inthanon/Waterfall7.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall8.jpg" 
                  alt="น้ำตกสิริภูมิ" 
                  onClick={() => openFullImage("images/inthanon/Waterfall8.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall9.jpg" 
                  alt="น้ำตกห้วยทรายเหลือง" 
                  onClick={() => openFullImage("images/inthanon/Waterfall9.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Waterfall10.jpg" 
                  alt="น้ำตกออบน้อย" 
                  onClick={() => openFullImage("images/inthanon/Waterfall10.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/DoiInthanon.jpg" 
                  alt="ยอดดอยอินทนนท์" 
                  onClick={() => openFullImage("images/inthanon/DoiInthanon.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
           
            <ul>
              <li>กิ่วแม่ปาน</li>
              <li>อ่างกา</li>
              <li>น้ำตกแท่นพระสังข์</li>
              <li>น้ำตกผาดอกเสี้ยว</li>
              <li>น้ำตกแม่กลาง</li>
              <li>น้ำตกแม่ปาน</li>
              <li>น้ำตกแม่ยะ</li>
              <li>น้ำตกวชิรธาร</li>
              <li>น้ำตกวังม่วง</li>
              <li>น้ำตกสิริภูมิ</li>
              <li>น้ำตกห้วยทรายเหลือง</li>
              <li>น้ำตกออบน้อย</li>
              <li>ยอดดอยอินทนนท์</li>
            </ul>

            <h2>เส้นทางเดินป่าและระดับความยาก</h2>

            <h3>เส้นทางศึกษาธรรมชาติกิ่วแม่ปาน</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage2(!showImage2)}>Picture</button>
            </div>
            
            {showImage2 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/Gillwalk.jpg" 
                  alt="เส้นทางศึกษาธรรมชาติกิ่วแม่ปาน" 
                  onClick={() => openFullImage("images/inthanon/Gillwalk.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Paan1.jpg" 
                  alt="เส้นทางศึกษาธรรมชาติกิ่วแม่ปาน"
                  onClick={() => openFullImage("images/inthanon/Paan1.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Paan2.jpg" 
                  alt="เส้นทางศึกษาธรรมชาติกิ่วแม่ปาน"
                  onClick={() => openFullImage("images/inthanon/Paan2.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ระยะทาง: ประมาณ 3.2 กิโลเมตร</li>
              <li>ระยะเวลา: ประมาณ 2-3 ชั่วโมง</li>
              <li>ความยาก: (Nature Trail) เหมาะสำหรับผู้เริ่มต้น</li>
              <li>ลักษณะเส้นทาง: เส้นทางวงรอบที่ผ่านป่าดิบชื้นและทุ่งหญ้าบนยอดเขา มีจุดชมวิวทะเลหมอกและพระอาทิตย์ขึ้นที่สวยงาม​</li>
              <li>ช่วงเวลาที่เหมาะสม: เดือนพฤศจิกายนถึงพฤษภาคม เนื่องจากเส้นทางจะปิดในช่วงฤดูฝนเพื่อฟื้นฟูธรรมชาติ</li>
              <li>หมายเหตุ: จำเป็นต้องมีมัคคุเทศก์ท้องถิ่นนำทาง</li>
            </ul>

            <h3> เส้นทางศึกษาธรรมชาติอ่างกา</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage3(!showImage3)}>Picture</button>
            </div>
            
            {showImage3 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/Bath.jpg" 
                  alt="เส้นทางศึกษาธรรมชาติอ่างกา" 
                  onClick={() => openFullImage("images/inthanon/Bath.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/ga1.jpg" 
                  alt="เส้นทางศึกษาธรรมชาติอ่างกา" 
                  onClick={() => openFullImage("images/inthanon/ga1.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/ga2.jpg" 
                  alt="เส้นทางศึกษาธรรมชาติอ่างกา" 
                  onClick={() => openFullImage("images/inthanon/ga2.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ระยะทาง: ประมาณ 360 กิโลเมตร</li>
              <li>ระยะเวลา: ประมาณ 30 นาที</li>
              <li>ความยาก: สูง</li>
              <li>ลักษณะเส้นทาง: ทางเดินไม้ผ่านป่าดิบเขาที่ชื้นและเขียวชอุ่มตลอดปี เนื่องจากอยู่บนระดับความสูง 2,565 เมตร ซึ่งเป็นจุดสูงสุดของประเทศไทย​</li>
              <li>จุดเด่น: พบพืชพรรณหายาก เช่น มอส เฟิร์น และกล้วยไม้ป่า​</li>
            </ul>

            <h3>เส้นทางน้ำตกผาดอกเสี้ยว</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage4(!showImage4)}>Picture</button>
            </div>
            
            {showImage4 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/Flower.jpg" 
                  alt="ผาดอกเสี้ยว" 
                  onClick={() => openFullImage("images/inthanon/Flower.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Pa.jpg" 
                  alt="ผาดอกเสี้ยว" 
                  onClick={() => openFullImage("images/inthanon/Pa.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Pa2.jpg" 
                  alt="ผาดอกเสี้ยว" 
                  onClick={() => openFullImage("images/inthanon/Pa2.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ระยะทาง: ประมาณ 2.6 กิโลเมตร</li>
              <li>ระยะเวลา: ประมาณ 2-3 ชั่วโมง</li>
              <li>ความยาก: ระดับ 2 (Hiking หรือ Beginner Trekking) เหมาะสำหรับผู้ที่มีประสบการณ์การเดินป่ามาบ้าง</li>
              <li>จุดเด่น: น้ำตกที่มีทั้งหมด 10 ชั้น แต่เปิดให้นักท่องเที่ยวเข้าชมได้เพียงบางส่วน</li>
              <li>ลักษณะเส้นทาง: เส้นทางผ่านป่าเขาและลำธาร นำไปสู่น้ำตกผาดอกเสี้ยวที่สวยงาม</li>
            </ul>

            <h3>อุปกรณที่ควรเตรียมไป</h3>
            <ul>
              <li>เสื้อผ้า</li>
              <li>เสื้อกันฝนหรือเสื้อกันลม</li>
              <li>รองเท้าเดินป่า</li>
              <li>กระเป๋าเป้เดินป่า (ควรเลือกแบบกันน้ำและรองรับน้ำหนักได้ดี)</li>
              <li>ชุดปฐมพยาบาล</li>
              <li>น้ำดื่ม (อย่างน้อย 2 ลิตร)</li>
              <li>แผนที่หรือ GPS  (สำคัญมากสำหรับเส้นทางที่ไม่คุ้นเคย)</li>
              <li>Power Bank (ควรพกสำรองเพื่อชาร์จโทรศัพท์ในกรณีฉุกเฉิน)</li>
            </ul>
            
            <h3>จุดชมวิว</h3>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage5(!showImage5)}>Picture</button>
            </div>
            
            {showImage5 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/41.jpg" 
                  alt="กม41" 
                  onClick={() => openFullImage("images/inthanon/41.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Gill.jpg" 
                  alt="จุดชมวิวกิ่วแม่ปาน" 
                  onClick={() => openFullImage("images/inthanon/Gill.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/GillWalk.jpg" 
                  alt="จุดชมวิวกิ่วแม่ปาน" 
                  onClick={() => openFullImage("images/inthanon/GillWalk.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>จุดชมวิวกิโลเมตรที่ 41 (กม.41)</li>
              <li>จุดชมวิวกิ่วแม่ปาน</li>
              <li>จุดชมวิวหน้าทางเข้ากิ่วแม่ปาน</li>
            </ul>

            <h3>การเดินทาง</h3>
            <ul>
              <li>รถยนต์ จากตัวเมืองเชียงใหม่ เดินทางโดยรถยนต์ไปตามทางหลวงแผ่นดินหมายเลข 108 
                (เชียงใหม่-ฮอด) ประมาณ 56 กม.ผ่านอำเภอหางดงและอำเภอสันปาตอง ไปยังอำเภอจอมทอง 
                ก่อนถึงอำเภอจอมทองประมาณ 2 กิโลเมตร เลี้ยวขวาตามทางหลวงจังหวัดหมายเลข 1009 (จอมทอง-ดอยอินทนนท์) 
                จะเริ่มเข้าเขตอุทยานแห่งชาติดอยอินทนนท์ที่กิโลเมตรที่ 8 (น้ำตกแม่กลาง) และตัดขึ้นสู่ยอดดอยอินทนนท์เป็นระยะทางทั้งหมด 
                48 กิโลเมตร ที่ทำการอุทยานแห่งชาติดอยอินทนนท์ตั้งอยู่ที่กิโลเมตรที่ 31</li>
            </ul>

            <h2>ที่พัก</h2>
            <h2>สถานที่กางเต็นท์</h2>
            <p>ลานกางเต็นท์ดงสน</p>
              
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage6(!showImage6)}>Picture</button>
            </div>
            
            {showImage6 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/Tent2.jpg" 
                  alt="ลานกางเต็นท์ดงสน" 
                  onClick={() => openFullImage("images/inthanon/Tent2.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Sont.jpg" 
                  alt="ลานกางเต็นท์ดงสน" 
                  onClick={() => openFullImage("images/inthanon/Sont.jpg")}
                  style={{ cursor: 'pointer' }}
                />
                <img 
                  src="images/inthanon/Sont2.jpg" 
                  alt="ลานกางเต็นท์ดงสน" 
                  onClick={() => openFullImage("images/inthanon/Sont2.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            <ul>
              <li>ที่ตั้ง: ห่างจากที่ทำการอุทยานฯ ประมาณ 1 กิโลเมตร​ สิ่งอำนวยความสะดวก​</li>
              <li>: มีพื้นที่สำหรับกางเต็นท์ ห้องน้ำ และที่ล้างจานให้บริการ​</li>
              <li> การจอง: นักท่องเที่ยวต้องนำเต็นท์มาเองและจองพื้นที่ล่วงหน้าผ่านระบบออนไลน์ของกรมอุทยานแห่งชาติฯ</li>
            </ul>
            
            <h3>บ้านพัก</h3>
            
            <p> บ้านพักภายในอุทยานฯ</p>
            
            <div className="button-wrapper-1">
              <button onClick={() => setShowImage7(!showImage7)}>Picture</button>
            </div>
            
            {showImage7 && (
              <div className="scroll-gallery">
                <img 
                  src="images/inthanon/House.jpg" 
                  alt=" บ้านพักภายในอุทยานฯ" 
                  onClick={() => openFullImage("images/inthanon/House.jpg")}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}
            
            <ul>
              <li>ลักษณะ: บ้านพักขนาดกลาง ตั้งอยู่ท่ามกลางป่าสน ภายในมีเตียงเดี่ยว 3 เตียง ห้องน้ำพร้อมเครื่องทำน้ำอุ่น และสิ่งอำนวยความสะดวกอื่นๆ ราคา</li>
              <li>ประมาณ 1,000 บาทต่อคืน ไม่รวมอาหารเช้า​</li>
              <li>การจอง: สามารถจองผ่านระบบออนไลน์ของกรมอุทยานแห่งชาติฯ</li>
              
              <p>The Garden Tent & House</p>
              
              <div className="button-wrapper-1">
                <button onClick={() => setShowImage8(!showImage8)}>Picture</button>
              </div>
              
              {showImage8 && (
                <div className="scroll-gallery">
                  <img 
                    src="images/inthanon/the garden.jpg" 
                    alt="Garden Tent & House" 
                    onClick={() => openFullImage("images/inthanon/the garden.jpg")}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src="images/inthanon/garden2.jpg" 
                    alt="Garden Tent & House" 
                    onClick={() => openFullImage("images/inthanon/garden2.jpg")}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src="images/inthanon/garden3.jpg" 
                    alt="Garden Tent & House" 
                    onClick={() => openFullImage("images/inthanon/garden3.jpg")}
                    style={{ cursor: 'pointer' }}
                  />
                  <img 
                    src="images/inthanon/garden4.jpg" 
                    alt="Garden Tent & House" 
                    onClick={() => openFullImage("images/inthanon/garden4.jpg")}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
              
              <ul>
                <li>ลักษณะ: ที่พักเปิดใหม่ มีทั้งบ้านพักและเต็นท์พร้อมห้องน้ำในตัว บรรยากาศดี รายล้อมด้วยธรรมชาติ​</li>
                <li>สิ่งอำนวยความสะดวก: มีร้านอาหารบริการ วัตถุดิบจากโครงการหลวง และบริการหมูกระทะ​</li>            
                <li>การจอง:สามารถติดต่อผ่านเว็บไซต์ของที่พักโดยตรง​</li>  
              </ul>  
            </ul>

            <h3>สุขา</h3>
            <p>ที่อุทยานฯ มีห้องน้ำให้บริการตามจุดต่าง ๆ เช่น</p>
            
            <ul>
              <li>ที่ทำการอุทยานแห่งชาติดอยอินทนนท์​</li>
              <li>บริเวณลานกางเต็นท์ดงสน​</li>
              <li>จุดชมวิวกิ่วแม่ปาน​</li>
              <li>สถานที่ท่องเที่ยวหลัก เช่น พระมหาธาตุเจดีย์นภเมทนีดล-นภพลภูมิสิริ​</li>
              <li>ห้องน้ำบางจุดอาจมีค่าบำรุงรักษาเล็กน้อย (ประมาณ 5-10 บาท) เพื่อความสะอาดและการดูแลพื้นที่​</li>
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

export default Second;