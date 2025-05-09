import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// สร้าง Context
const TripContext = createContext();

// ข้อมูลเริ่มต้นของทริปทั้งหมด
const initialTrips = [
  {
    id: "khao-yai-1",
    title: 'เขาใหญ่',
    offer: '2 วัน 1 คืน',
    discount: '10% OFF',
    images: [
      "https://cdn-hdeld.nitrocdn.com/rfjmmmNQRXrZcxyTvorafQsjchLDlasx/assets/images/optimized/rev-4a995e9/khaoyai.intercontinental.com/wp-content/uploads/rainforest-in-khao-yai-national-park-1048x699.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZkR8RfNu0j2bmvQnal2YEIIoz1vi5ezJK_w&s",
      "https://media.istockphoto.com/id/683251394/photo/haew-narok-waterfall.jpg?s=612x612&w=0&k=20&c=HlVMOnAWtQFkhYVYUyWxQw_qZkwDcG9R2Nc-Z8FudKw="
    ],
    contact: '086 092 6529',
    details: 'ท่องเที่ยวน้ำตกเหวนรก พักรีสอร์ทหรู พร้อมอาหาร 3 มื้อ',
    registered: 0,
    capacity: 15,
  },
  {
    id: "doi-inthanon-1",
    title: 'ดอยอินทนนท์',
    offer: '3 วัน 2 คืน',
    discount: '20% OFF',
    images: [
      "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2023/11/shutterstock_2091837973-1-825x550.jpg",
      "https://img.kapook.com/u/2021/sutasinee/11/3.jpg",
      "https://www.thailandlism.com/wp-content/uploads/2019/06/YUN00010.jpg"
    ],
    contact: '053-286-728',
    details: 'ชมพระมหาธาตุเจดีย์ เที่ยวน้ำตกวชิรธาร ชมวิวยอดดอย',
    registered: 0,
    capacity: 15,
  },
  {
    id: "thung-salaeng-luang-1",
    title: 'ทุ่งแสลงหลวง',
    offer: '3 วัน 2 คืน',
    discount: '25% OFF',
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    contact: '096 190 9808',
    details: 'ตั้งแคมป์ท่ามกลางทุ่งหญ้า ดูดาว เที่ยวน้ำตกแก่งโสภา',
    registered: 0,
    capacity: 15,
  },
  {
    id: "khao-yai-2",
    title: 'เขาใหญ่',
    offer: '2 วัน 1 คืน',
    discount: '15% OFF',
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320", 
      "/api/placeholder/400/320"
    ],
    contact: '081 234 5678',
    details: 'ไปกับเดอะแก๊ง กอฟ ออโต้ เปตอง ฮันเตอร์ ตะลุยหมีช้างวัวควาย',
    registered: 0,
    capacity: 15,
  },
  {
    id: "doi-inthanon-2",
    title: 'ดอยอินทนนท์',
    offer: '4 วัน 3 คืน',
    discount: '30% OFF',
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    contact: '089 765 4321',
    details: 'โรแมนติกกับ ไอฮัชกับเจ้าหญิงถั่ว ที่มีไอเก้าชัพอยู่ไกลๆ',
    registered: 0,
    capacity: 15,
  },
  {
    id: "doi-inthanon-3",
    title: 'ดอยอินทนนท์',
    offer: '3 วัน 2 คืน',
    discount: '20% OFF',
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    contact: '077 395 154',
    details: 'เดินป่าศึกษาธรรมชาติ',
    registered: 0,
    capacity: 15,
  }
];

// สร้าง Provider สำหรับจัดการข้อมูลทริป
export const TripProvider = ({ children }) => {
  // ใช้ localStorage เพื่อเก็บข้อมูลระหว่างการรีเฟรชหน้า
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('trips');
    return savedTrips ? JSON.parse(savedTrips) : initialTrips;
  });

  // ดึงข้อมูลการลงทะเบียนจาก API เมื่อโหลดหน้า
  useEffect(() => {
    const fetchRegistrationCounts = async () => {
      try {
        // ดึงข้อมูลการลงทะเบียนทั้งหมด
        const response = await axios.get('http://localhost:8080/api/registrations');
        const registrations = response.data;

        // คำนวณจำนวนผู้ลงทะเบียนตาม tripId
        const tripCounts = {};
        
        registrations.forEach(reg => {
          if (reg.tripId) {
            if (!tripCounts[reg.tripId]) {
              tripCounts[reg.tripId] = 0;
            }
            tripCounts[reg.tripId] += parseInt(reg.participants || 1);
          }
        });

        // อัปเดตจำนวนผู้ลงทะเบียนในแต่ละทริป
        setTrips(prevTrips => 
          prevTrips.map(trip => ({
            ...trip,
            registered: tripCounts[trip.id] || 0
          }))
        );
      } catch (error) {
        console.error("Error fetching registration counts:", error);
      }
    };

    fetchRegistrationCounts();
  }, []);

  // บันทึกข้อมูลลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  // ฟังก์ชันสำหรับเพิ่มจำนวนผู้ลงทะเบียน
  const registerTrip = (tripId, numberOfParticipants) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => 
        trip.id === tripId 
          ? { 
              ...trip, 
              registered: trip.registered + parseInt(numberOfParticipants) 
            } 
          : trip
      )
    );
  };

  // ฟังก์ชันสำหรับลดจำนวนผู้ลงทะเบียน
  const unregisterTrip = (tripId, numberOfParticipants) => {
    setTrips(prevTrips => 
      prevTrips.map(trip => {
        if (trip.id === tripId) {
          // คำนวณจำนวนใหม่ โดยไม่ให้น้อยกว่า 0
          const newRegistered = Math.max(0, trip.registered - parseInt(numberOfParticipants || 1));
          return { 
            ...trip, 
            registered: newRegistered
          };
        }
        return trip;
      })
    );
  };

  // ฟังก์ชันสำหรับรีเซ็ตจำนวนผู้ลงทะเบียนทั้งหมด (ใช้สำหรับการทดสอบ)
  const resetAllRegistrations = () => {
    setTrips(prevTrips => 
      prevTrips.map(trip => ({
        ...trip,
        registered: 0
      }))
    );
  };

  return (
    <TripContext.Provider value={{ trips, registerTrip, unregisterTrip, resetAllRegistrations }}>
      {children}
    </TripContext.Provider>
  );
};

// Hook สำหรับใช้งาน Context
export const useTrips = () => useContext(TripContext);

export default TripContext;