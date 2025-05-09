import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./post";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // โหลดข้อมูลทันทีเมื่อคอมโพเนนต์ถูกแสดง
    fetchPosts();
    
    // จากนั้นต้งค่าการรีเฟรชข้อมูลทุก 15 วินาที (ถี่ขึ้นกว่าเดิม)
    const interval = setInterval(fetchPosts, 15000);
    
    // เคลียร์ interval เมื่อคอมโพเนนต์ถูกยกเลิก
    return () => clearInterval(interval);
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    
    try {
      const response = await axios.get("http://localhost:8080/api/posts/post");
      console.log("ดึงข้อมูลโพสต์สำเร็จ:", response.data);
      
      // เรียงลำดับโพสต์ตามวันที่สร้าง (ใหม่สุดก่อน)
      const sortedPosts = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      // แสดง log เพื่อดูข้อมูลเวลา
      if (sortedPosts.length > 0) {
        console.log("โพสต์ล่าสุด:", sortedPosts[0].text);
        console.log("วันที่/เวลาของโพสต์ล่าสุด:", sortedPosts[0].createdAt);
        console.log("เวลาปัจจุบัน:", new Date().toISOString());
      }
      
      setPosts(sortedPosts);
      setError("");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์:", error);
      setError("ไม่สามารถโหลดโพสต์ได้ กรุณาลองอีกครั้งในภายหลัง");
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันสำหรับการจัดการเมื่อโพสต์ถูกลบ
  const handlePostDeleted = (deletedPostId) => {
    // อัปเดตสถานะโดยลบโพสต์ที่มี ID ตรงกับโพสต์ที่ถูกลบ
    setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
  };

  return (
    <div className="posts-list">
      {error && <div className="error-message" style={{color: 'red', margin: '10px 0', textAlign: 'center'}}>{error}</div>}
      
      {isLoading && posts.length === 0 && (
        <div className="loading-message" style={{textAlign: 'center', margin: '20px 0'}}>
          กำลังโหลดโพสต์...
        </div>
      )}
      
      {/* แสดงโพสต์เริ่มต้นที่กำหนดไว้ล่วงหน้าก่อน */}
      <Post />
      
      {/* จากนั้นแสดงโพสต์ทั้งหมดจากเซิร์ฟเวอร์ พร้อมส่ง callback สำหรับการลบโพสต์ */}
      {posts.map((post) => (
        <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />
      ))}
      
      {posts.length === 0 && !isLoading && !error && (
        <div className="no-posts-message" style={{textAlign: 'center', margin: '20px 0'}}>
          ยังไม่มีโพสต์ มาเป็นคนแรกที่แชร์อะไรสักอย่างกัน!
        </div>
      )}
    </div>
  );
}

export default PostsList;