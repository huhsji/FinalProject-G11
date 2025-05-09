import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Component/main.css";
import { useTrips } from "./TripContext";
import PaymentConfirmation from "./PaymentConfirmation"; // Import PaymentConfirmation component

const RegisterForm = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trips, registerTrip } = useTrips();
  
  // State for form data
  const [formData, setFormData] = useState({
    tripId: "",
    participants: "",
    travelDate: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    idCard: "",
    country: "",
    zipCode: "",
    city: "",
    province: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [showPayment, setShowPayment] = useState(false); // State for showing payment component
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Find trip details
  const currentTrip = trips.find(trip => trip.id === tripId) || {};
  
  useEffect(() => {
    document.body.classList.add("register-page");
    
    if (currentTrip.id) {
      setFormData(prev => ({
        ...prev,
        tripId: currentTrip.id
      }));
    }
    
    return () => {
      document.body.classList.remove("register-page");
    };
  }, [currentTrip.id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle back button
  const handleBack = () => {
    navigate('/holidays');
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.participants) {
      setError("กรุณาเลือกจำนวนผู้เข้าร่วม");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await axios.post(
        "http://localhost:8080/api/registrations", 
        formData
      );
      
      console.log("Registration successful:", response.data);
      
      // อัปเดตสถานะใน Context API (เพื่อให้ UI อัปเดตทันที)
      registerTrip(tripId, parseInt(formData.participants));
      
      // แสดงหน้าชำระเงิน
      setShowPayment(true);
      
    } catch (error) {
      console.error("Error during registration:", error);
      setError("เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองอีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  // แสดงหน้าชำระเงิน
  if (showPayment) {
    return <PaymentConfirmation tripPrice={currentTrip.discount} />;
  }

  return (
    <>
      <div className="logo-container">
        <img src="/api/placeholder/150/150" alt="Logo" className="logo" />
      </div>
      
      <div className="register-container">
        <button onClick={handleBack} className="back-button">← กลับไปหน้าโปรโมชั่น</button>
        
        {error && (
          <div className="error-message" style={{ color: 'red', margin: '10px 0', padding: '10px', backgroundColor: '#ffebee', borderRadius: '5px' }}>
            {error}
          </div>
        )}
        
        {submitted ? (
          <div className="success-message">
            <h2>ลงทะเบียนและชำระเงินสำเร็จ!</h2>
            <p>ขอบคุณสำหรับการลงทะเบียน กำลังนำคุณกลับไปยังหน้าโปรโมชั่น...</p>
          </div>
        ) : (
          <>
            <h1>ลงทะเบียนทริป</h1>
            {currentTrip.title && <h2>{currentTrip.title}</h2>}
            {currentTrip.offer && <p>{currentTrip.offer} | {currentTrip.discount} | {currentTrip.details}</p>}
            
            <div className="capacity-display">
              จำนวน: <span className="capacity-count">{currentTrip.registered || 0}/{currentTrip.capacity || 15}</span>
            </div>
            
            <div className="form-header">
              <p style={{ margin: '0', color: 'white', fontWeight: 'bold' }}>กรุณากรอกข้อมูลเพื่อลงทะเบียนเข้าร่วมทริป</p>
            </div>
            
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>จำนวนผู้เข้าร่วม</label>
                <select 
                  required
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                >
                  <option value="">เลือกจำนวน</option>
                  <option value="1">1 คน</option>
                  <option value="2">2 คน</option>
                  <option value="3">3 คน</option>
                  <option value="4">4 คน</option>
                  <option value="5">5 คน</option>
                </select>
              </div>

              <div className="form-group">
                <label>วันที่ต้องการเดินทาง</label>
                <input 
                  type="date" 
                  required 
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>ชื่อ-นามสกุล</label>
                <input 
                  type="text" 
                  required 
                  placeholder="ชื่อ-นามสกุลของคุณ" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>เบอร์โทรศัพท์</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="เบอร์โทรศัพท์ของคุณ" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>อีเมล</label>
                <input 
                  type="email" 
                  required 
                  placeholder="อีเมลของคุณ" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>เลขบัตรประชาชน/พาสปอร์ต</label>
                <input 
                  type="text" 
                  required 
                  placeholder="เลขบัตรประจำตัว" 
                  name="idCard"
                  value={formData.idCard}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>ประเทศ</label>
                <select 
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">เลือกประเทศ</option>
                  <option value="Thailand">ไทย</option>
                  <option value="Malaysia">มาเลเซีย</option>
                  <option value="Singapore">สิงคโปร์</option>
                  <option value="Other">อื่นๆ</option>
                </select>
              </div>

              <div className="form-group">
                <label>รหัสไปรษณีย์</label>
                <input 
                  type="text" 
                  placeholder="รหัสไปรษณีย์" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>เมือง/อำเภอ</label>
                <input 
                  type="text" 
                  placeholder="เมือง/อำเภอ" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>จังหวัด</label>
                <input 
                  type="text" 
                  placeholder="จังหวัด" 
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label>ที่อยู่ *</label>
                <textarea 
                  required 
                  placeholder="ที่อยู่ของคุณ"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label>ชื่อผู้ติดต่อฉุกเฉิน</label>
                <input 
                  type="text" 
                  required 
                  placeholder="ชื่อผู้ติดต่อฉุกเฉิน" 
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>เบอร์โทรผู้ติดต่อฉุกเฉิน</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="เบอร์โทรผู้ติดต่อฉุกเฉิน" 
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <div className="checkbox-group">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">ข้าพเจ้ายอมรับเงื่อนไขและข้อตกลง</label>
                </div>
              </div>

              <div className="form-group full-width">
                <div className="checkbox-group">
                  <input type="checkbox" id="privacy" required />
                  <label htmlFor="privacy">ข้าพเจ้าได้อ่านและเข้าใจนโยบายความเป็นส่วนตัว</label>
                </div>
              </div>

              <button type="submit" disabled={isLoading}>
                {isLoading ? "กำลังดำเนินการ..." : "ดำเนินการต่อ"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default RegisterForm;