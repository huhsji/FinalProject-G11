import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate สำหรับการนำทาง
import "../Component/Trip.css";

// ข้อมูลทริปตัวอย่าง
const tripData = [
  { 
    id: 5, 
    name: "เขาใหญ่", 
    image: "https://cdn-hdeld.nitrocdn.com/rfjmmmNQRXrZcxyTvorafQsjchLDlasx/assets/images/optimized/rev-4a995e9/khaoyai.intercontinental.com/wp-content/uploads/rainforest-in-khao-yai-national-park-1048x699.jpg", 
    rating: 4.3,
    details: "ดูพระอาทิตย์ขึ้นที่ผาเดียวดายกัน จุดชมพระอาทิตย์ขึ้นที่กว้างและสูงที่สุดของอุทยานแห่งชาติเขาใหญ่",
    location: "นครราชสีมา",
    type: "khoayai" // เพิ่มประเภทของทริป
  },
  { 
    id: 6, 
    name: "ทุ่งแสลงหลวง", 
    image: "https://s359.kapook.com//pagebuilder/b196c851-2a73-467a-9c28-0b6130f540d7.jpg", 
    rating: 4.1,
    details: "ทุ่งนางพญา เป็นทุ่งหญ้าแบบสะวันนา ล้อมรอบด้วยป่าสนสองใบ สลับกับป่าดิบแล้งและป่าเต็งรัง",
    location: "เพชรบูรณ์",
    type: "slang" // เพิ่มประเภทของทริป
  },
  { 
    id: 3, 
    name: "ทุ่งแสลงหลวง", 
    image: "https://v4i.rweb-images.com/www.khaokho.com/images/editor/Tungsalaengluang02.jpg", 
    rating: 4.5,
    details: "สภาพพื้นที่เป็นทุ่งหญ้าโล่งใหญ่ สัตว์ป่าที่พบได้แก่ ช้างป่า กระทิง ลิงกัง กวางป่า หมูป่า กระต่ายป่า",
    location: "จังหวัดพิษณุโลก",
    featured: true,
    type: "slang" // เพิ่มประเภทของทริป
  },
  { 
    id: 4, 
    name: "ทุ่งแสลงหลวง", 
    image: "https://phitsanulok.prd.go.th/th/file/get/file/2023101939a1cf80ffc6cfa5ffa74f0168856aa8153138.jpg", 
    rating: 4.6,
    details: " ทุ่งหญ้าสะวันนาสลับกับป่าสนเขาที่สวยงาม อยู่ใจกลางอุทยาน มีลักษณะคล้ายทุ่งแสลงหลวง และทุ่งนางพญา",
    location: "จังหวัดพิษณุโลก",
    type: "slang" // เพิ่มประเภทของทริป
  },
  { 
    id: 1, 
    name: "ดอยอินทนนท์ ", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Naphamethinidon%2C_Naphaphonphumisiri_near_summit_of_Doi_Inthanon.jpg/1200px-Naphamethinidon%2C_Naphaphonphumisiri_near_summit_of_Doi_Inthanon.jpg", 
    rating: 4.7,
    details: "เยี่ยมชมสถานที่ศักดิ์สิทธิ์ อย่างพระมหาธาตุนภเมทนีดล และพระมหาธาตุนภพลภูมิสิริ",
    location: "จังหวัดเชียงใหม่",
    featured: true,
    type: "inthanon" // เพิ่มประเภทของทริป
  },
  { 
    id: 2, 
    name: "เขาใหญ่", 
    image: "https://news.thaipbs.or.th/media/2aYqS0l4EOhseuUjgjtwu9iGzQ4JxHrg.jpg", 
    rating: 4.9,
    details: "น้ำตกเหวนรก เป็นน้ำตกที่มีหน้าผาสูงชัน 5 ชั้น ระยะทางจากจุดจอดรถเดินไปน้ำตกประมาณ 1 กิโล",
    location: "จังหวัดนครนายก และจังหวัดสระบุรี",
    featured: true,
    type: "khoayai" // เพิ่มประเภทของทริป
  },
  { 
    id: 7, 
    name: "เขาใหญ่", 
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Khaoyai_panorama2.jpg", 
    rating: 4.7,
    details: "กม.ที่ 30 เป็นจุดชมวิวที่สามารถมองเห็นภูเขาได้กว้างมากๆ อากาศเย็นมีหมอกสีขาวลอยตามทิวเขาสลับกับสีเขียว",
    location: "จังหวัดปราจีนบุรี จังหวัดนครราชสีมา",
    type: "khoayai" // เพิ่มประเภทของทริป
  },
  { 
    id: 8, 
    name: "ดอยอินทนนท์", 
    image: "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2023/11/shutterstock_2459543547-1-979x550.jpg", 
    rating: 4.4,
    details: "เส้นทางศึกษาธรรมชาติอ่างกา ที่รายล้อมไปด้วยป่าไม้บริสุทธิ์ เนินเขาที่ปกคลุมไปด้วยหมอก",
    location: "จังหวัดเชียงใหม่",
    type: "inthanon" // เพิ่มประเภทของทริป
  },
  { 
    id: 9, 
    name: "เขาใหญ่", 
    image: "https://woodychannel.com/wp-content/uploads/2014/11/nongpag.jpg", 
    rating: 4.8,
    details: "จุดชมดูสัตว์จะต้องเดินเท้าเข้าไปที่หอส่องสัตว์ 1 กิโลเมตร ทุ่งหญ้ากว้างๆ หมอกจางๆ อากาศเย็นสบายชุ่มฉ่ำ",
    location: "จังหวัดนครนายก และจังหวัดสระบุรี",
    type: "khoayai" // เพิ่มประเภทของทริป
  },
  { 
    id: 10, 
    name: "ดอยอินทนนท์", 
    image: "https://s359.kapook.com/pagebuilder/f776c2bd-94d7-43a2-9c0b-bd42b394c0c3.jpg", 
    rating: 4.6,
    details: "สัมผัสความงามอันน่าทึ่งของทะเลหมอกที่กิ่วแม่ปาน สัมผัสอากาศเย็น และชมพระอาทิตย์ขึ้นอันงดงาม",
    location: "จังหวัดเชียงใหม่",
    type: "inthanon" // เพิ่มประเภทของทริป
  }
];

const Trip = ({ goToMain }) => {
  const navigate = useNavigate(); // เพิ่ม navigate
  const [search, setSearch] = useState("");
  const [filteredTrips, setFilteredTrips] = useState(tripData);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [randomTrips, setRandomTrips] = useState([]);
  const featuredTrips = tripData.filter(trip => trip.featured);

  // สร้างทริปสุ่มเมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    // ฟังก์ชันสำหรับสลับสับเปลี่ยนอาร์เรย์ด้วยอัลกอริทึม Fisher-Yates
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    // สร้างทริปสุ่ม (ไม่รวมทริปที่เป็น featured)
    setRandomTrips(shuffleArray(tripData).slice(0, 3));
  }, []);

  // จัดการการค้นหา
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredTrips(
      tripData.filter((trip) => 
        trip.name.toLowerCase().includes(query) || 
        trip.location.toLowerCase().includes(query)
      )
    );
  };

  // หมุนสไลด์อัตโนมัติ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // แสดงดาวตามคะแนน
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ opacity: 0.3 }}>★</span>);
    }
    
    return stars;
  };

  // จัดการการคลิกทริป
  const handleTripClick = (trip) => {
    // นำทางไปยังหน้ารายละเอียดตามประเภททริป
    if (trip.type === "khoayai") {
      navigate('/khoayai'); // นำทางไปหน้าเขาใหญ่
    } else if (trip.type === "inthanon") {
      navigate('/inthanon'); // นำทางไปหน้าดอยอินทนนท์
    } else if (trip.type === "slang") {
      navigate('/slang'); // นำทางไปหน้าทุ่งแสลงหลวง
    } else {
      // ถ้าไม่มีประเภทที่ตรงกัน ให้ใช้ goToMain (ถ้ามี) หรือไปยังหน้าโปรโมชัน
      if (typeof goToMain === 'function') {
        goToMain();
      } else {
        navigate('/holidays');
      }
    }
  };

  return (
    <div className="trip-page">
      <div className="trip-container">
        <div className="trip-header">
          <h1>Welcome to Our Trip Booking Page</h1>
          <p>Book your trip now and explore new destinations with us!</p>
        </div>

        {/* ช่องค้นหา */}
        <div className="search-container">
          <input
            type="text"
            placeholder="ค้นหาทริปที่ต้องการ..."
            value={search}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>

        {/* แสดงทริปแนะนำแบบสไลด์ */}
        <div className="featured-trips">
          <div 
            className="carousel-container" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="carousel-slide">
              {featuredTrips.map((trip) => (
                <div 
                  key={`featured-${trip.id}`} 
                  className="featured-card" 
                  onClick={() => handleTripClick(trip)} // เพิ่มการส่งข้อมูลทริป
                >
                  <img src={trip.image} alt={trip.name} className="featured-image" />
                  <div className="featured-content">
                    <h3>{trip.name}</h3>
                    <div className="stars">{renderStars(trip.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-slide">
              {/* แสดงทริปสุ่ม */}
              {randomTrips.map((trip) => (
                <div 
                  key={`featured-random-${trip.id}`} 
                  className="featured-card" 
                  onClick={() => handleTripClick(trip)} // เพิ่มการส่งข้อมูลทริป
                >
                  <img src={trip.image} alt={trip.name} className="featured-image" />
                  <div className="featured-content">
                    <h3>{trip.name}</h3>
                    <div className="stars">{renderStars(trip.rating)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* แสดงกริดทริปทั้งหมด */}
        <div className="trip-grid">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div 
                key={trip.id} 
                className="trip-card" 
                onClick={() => handleTripClick(trip)} // เพิ่มการส่งข้อมูลทริป
              >
                <img src={trip.image} alt={trip.name} className="trip-image" />
                <div className="trip-content">
                  <h3 className="trip-title">{trip.name}</h3>
                  <div className="stars">{renderStars(trip.rating)}</div>
                  <div className="trip-details">{trip.details}</div>
                  <div className="trip-location">
                    <span>📍</span> {trip.location}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              <p>ไม่พบผลลัพธ์</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trip;