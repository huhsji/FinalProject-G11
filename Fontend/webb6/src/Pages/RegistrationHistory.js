import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { useTrips } from './TripContext'; // เพิ่มการ import useTrips
import '../Component/RegistrationHistory.css';

// ฟังก์ชันสำหรับคำนวณวันที่แบบ locale ไทย
const formatDate = (dateString) => {
  if (!dateString) return "-";
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};

const RegistrationHistory = () => {
  const navigate = useNavigate();
  const { unregisterTrip } = useTrips(); // เพิ่มการใช้งาน unregisterTrip จาก context
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailView, setDetailView] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState('');
  
  const itemsPerPage = 10;
  
  // ดึงข้อมูลการลงทะเบียนทั้งหมด
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await axios.get('http://localhost:8080/api/registrations');
        setRegistrations(response.data);
        setFilteredRegistrations(response.data);
        
        // สร้าง Set ของ tripId เพื่อใช้ในการกรอง
        const uniqueTrips = [...new Set(response.data.map(reg => reg.tripId))];
        setTrips(uniqueTrips);
      } catch (err) {
        console.error('Error fetching registration data:', err);
        setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // กรองข้อมูลเมื่อมีการค้นหาหรือเลือกทริป
  useEffect(() => {
    let results = registrations;
    
    // กรองตามการค้นหา
    if (searchTerm) {
      results = results.filter(
        reg => 
          reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.phoneNumber?.includes(searchTerm)
      );
    }
    
    // กรองตามทริปที่เลือก
    if (selectedTrip) {
      results = results.filter(reg => reg.tripId === selectedTrip);
    }
    
    setFilteredRegistrations(results);
    setCurrentPage(1); // รีเซ็ตหน้าเมื่อเปลี่ยนการกรอง
  }, [searchTerm, selectedTrip, registrations]);
  
  // คำนวณข้อมูลสำหรับการแบ่งหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  
  // ฟังก์ชันสำหรับการเปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // ฟังก์ชันสำหรับการค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    // การค้นหาถูกจัดการโดย useEffect ที่ติดตาม searchTerm แล้ว
  };
  
  // ฟังก์ชันสำหรับแสดงรายละเอียด
  const handleViewDetails = (registration) => {
    setDetailView(registration);
  };
  
  // ฟังก์ชันสำหรับลบข้อมูล
  const handleDeleteRegistration = async (id) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่ต้องการลบข้อมูลนี้?')) {
      return;
    }
    
    try {
      // ค้นหาข้อมูลการลงทะเบียนที่จะลบ
      const registrationToDelete = registrations.find(reg => reg.id === id);
      
      if (registrationToDelete) {
        // ลบข้อมูลจาก API
        await axios.delete(`http://localhost:8080/api/registrations/${id}`);
        
        // ลดจำนวนผู้ลงทะเบียนใน Context
        unregisterTrip(
          registrationToDelete.tripId,
          parseInt(registrationToDelete.participants || 1)
        );
        
        // อัปเดตข้อมูลหลังจากลบ
        setRegistrations(prevRegistrations => 
          prevRegistrations.filter(reg => reg.id !== id)
        );
        
        alert('ลบข้อมูลเรียบร้อยแล้ว');
      } else {
        alert('ไม่พบข้อมูลที่ต้องการลบ');
      }
    } catch (err) {
      console.error('Error deleting registration:', err);
      alert('เกิดข้อผิดพลาดในการลบข้อมูล กรุณาลองใหม่อีกครั้ง');
    }
  };
  
  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: '100px' }}>
        <div className="history-container">
          <div className="history-header">
            <h1 className="history-title">ประวัติการลงทะเบียนทริป</h1>
            <button 
              className="search-button" 
              onClick={() => navigate('/holidays')}
              style={{ backgroundColor: '#649b69' }}
            >
              ดูโปรโมชั่นทริป
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          {/* ส่วนค้นหา */}
          <form onSubmit={handleSearch} className="search-container">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อ อีเมล หรือเบอร์โทร..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">ค้นหา</button>
          </form>
          
          {/* ส่วนกรองตามทริป */}
          <div className="filter-container">
            <select
              className="filter-select"
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
            >
              <option value="">ทุกทริป</option>
              {trips.map((trip, index) => (
                <option key={index} value={trip}>
                  {trip}
                </option>
              ))}
            </select>
          </div>
          
          {isLoading ? (
            <div className="loading">กำลังโหลดข้อมูล...</div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="no-data">ไม่พบข้อมูลการลงทะเบียน</div>
          ) : (
            <>
              {/* ตารางแสดงข้อมูล */}
              <div style={{ overflowX: 'auto' }}>
                <table className="registration-table">
                  <thead>
                    <tr>
                      <th>ชื่อ-นามสกุล</th>
                      <th>ทริป</th>
                      <th>จำนวนผู้เข้าร่วม</th>
                      <th>วันเดินทาง</th>
                      <th>อีเมล</th>
                      <th>เบอร์โทร</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((registration) => (
                      <tr key={registration.id}>
                        <td>{registration.fullName || '-'}</td>
                        <td>{registration.tripId || '-'}</td>
                        <td>{registration.participants || '-'}</td>
                        <td>{formatDate(registration.travelDate)}</td>
                        <td>{registration.email || '-'}</td>
                        <td>{registration.phoneNumber || '-'}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="view-btn"
                              onClick={() => handleViewDetails(registration)}
                            >
                              ดูรายละเอียด
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteRegistration(registration.id)}
                            >
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* ส่วนการแบ่งหน้า */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo; ก่อนหน้า
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? 'active' : ''}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    ถัดไป &raquo;
                  </button>
                </div>
              )}
            </>
          )}
          
          {/* โมดัลแสดงรายละเอียด */}
          {detailView && (
            <div className="detail-modal">
              <div className="detail-content">
                <div className="detail-header">
                  <h2>ข้อมูลการลงทะเบียน</h2>
                  <button
                    className="close-btn"
                    onClick={() => setDetailView(null)}
                  >
                    &times;
                  </button>
                </div>
                
                <div className="detail-info">
                  <h3>ข้อมูลทริป</h3>
                  <div className="detail-row">
                    <div className="detail-label">รหัสทริป:</div>
                    <div className="detail-value">{detailView.tripId}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">จำนวนผู้เข้าร่วม:</div>
                    <div className="detail-value">{detailView.participants} คน</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">วันที่เดินทาง:</div>
                    <div className="detail-value">{formatDate(detailView.travelDate)}</div>
                  </div>
                  
                  <h3>ข้อมูลผู้ลงทะเบียน</h3>
                  <div className="detail-row">
                    <div className="detail-label">ชื่อ-นามสกุล:</div>
                    <div className="detail-value">{detailView.fullName}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">อีเมล:</div>
                    <div className="detail-value">{detailView.email}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">เบอร์โทรศัพท์:</div>
                    <div className="detail-value">{detailView.phoneNumber}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">เลขบัตรประชาชน/พาสปอร์ต:</div>
                    <div className="detail-value">{detailView.idCard}</div>
                  </div>
                  
                  <h3>ที่อยู่</h3>
                  <div className="detail-row">
                    <div className="detail-label">ประเทศ:</div>
                    <div className="detail-value">{detailView.country}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">จังหวัด:</div>
                    <div className="detail-value">{detailView.province}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">อำเภอ/เขต:</div>
                    <div className="detail-value">{detailView.city}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">รหัสไปรษณีย์:</div>
                    <div className="detail-value">{detailView.zipCode}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">ที่อยู่:</div>
                    <div className="detail-value">{detailView.address}</div>
                  </div>
                  
                  <h3>ข้อมูลติดต่อฉุกเฉิน</h3>
                  <div className="detail-row">
                    <div className="detail-label">ชื่อผู้ติดต่อฉุกเฉิน:</div>
                    <div className="detail-value">{detailView.emergencyContact}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">เบอร์โทรฉุกเฉิน:</div>
                    <div className="detail-value">{detailView.emergencyPhone}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationHistory;