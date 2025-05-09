import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './Pages/NavigationBar';
import Feed from './Pages/Feed';
import Pro from './Pages/Pro';
import RegisterForm from './Pages/main';
import RegistrationHistory from './Pages/RegistrationHistory';
import Trip from './Pages/Trip';
import { TripProvider } from './Pages/TripContext';
// Import our new ShareButton component

// นำเข้าคอมโพเนนต์รายละเอียดอุทยาน
import KhoaYai from './Pages/KhoaYai';
import Inthanon from './Pages/Inthanon';
import Slang from './Pages/Slang';

const App = () => {
  return (
    <TripProvider>
      {/* Add ShareButton here so it appears on all pages */}
     
      
      <Routes>
        {/* หน้าหลัก - ใช้ Trip แทน HeroSection */}
        <Route
          path="/"
          element={
            <>
              <NavigationBar />
              <Trip goToMain={() => window.location.href = '/holidays'} />
            </>
          }
        />
        
        {/* หน้า Trips (โปรโมชั่นทริป) */}
        <Route
          path="/holidays"
          element={
            <>
              <NavigationBar />
              <div style={{marginTop: '80px', paddingTop: '20px'}}>
                <Pro />
              </div>
            </>
          }
        />
        
       
        
        {/* หน้า Content (โพสต์และแชร์) */}
        <Route
          path="/destinations"
          element={
            <>
              <NavigationBar />
              <div style={{marginTop: '100px', padding: '20px'}}>
                <Feed />
              </div>
            </>
          }
        />
        
        {/* หน้าสมัครทริป */}
        <Route
          path="/register"
          element={
            <RegisterForm />
          }
        />
        
        {/* หน้าสมัครทริปพร้อมส่งพารามิเตอร์ ID */}
        <Route
          path="/register/:tripId"
          element={
            <RegisterForm />
          }
        />
        
        {/* หน้าโปรโมชั่น */}
        <Route
          path="/promotions"
          element={
            <>
              <NavigationBar />
              <div style={{marginTop: '80px', paddingTop: '20px'}}>
                <Pro />
              </div>
            </>
          }
        />
        
        {/* หน้าประวัติการลงทะเบียน */}
        <Route
          path="/history"
          element={
            <RegistrationHistory />
          }
        />
        
        {/* เพิ่มเส้นทางไปยังหน้ารายละเอียดอุทยานแต่ละแห่ง */}
        <Route
          path="/khoayai"
          element={<KhoaYai />}
        />
        
        <Route
          path="/inthanon"
          element={<Inthanon />}
        />
        
        <Route
          path="/slang"
          element={<Slang />}
        />
      </Routes>
    </TripProvider>
  );
}

export default App;