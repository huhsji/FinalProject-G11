import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Component/comment.css";
import Image from "../assets/golden.webp";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  
  // State for reply functionality
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // ฟังก์ชันสำหรับดึงข้อมูลความคิดเห็นของโพสต์
  const fetchComments = async () => {
    if (!postId) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      // ดึงความคิดเห็นจาก API
      const response = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);
      
      // จัดระเบียบความคิดเห็นและคำตอบ
      const formattedComments = organizeComments(response.data);
      setComments(formattedComments);
      setCommentCount(countAllComments(formattedComments));
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงความคิดเห็น:", error);
      setError("ไม่สามารถโหลดความคิดเห็นได้");
    } finally {
      setIsLoading(false); 
    }
  };

  // จัดเรียงความคิดเห็นและคำตอบให้อยู่ในรูปแบบที่ถูกต้อง
  const organizeComments = (commentsArray) => {
    // แยกความคิดเห็นหลักและคำตอบ
    const mainComments = commentsArray.filter(comment => !comment.parentId);
    const replies = commentsArray.filter(comment => comment.parentId);
    
    // เพิ่มคำตอบให้กับแต่ละความคิดเห็นหลัก
    return mainComments.map(mainComment => {
      const commentReplies = replies.filter(reply => reply.parentId === mainComment.id);
      return {
        ...mainComment,
        replies: commentReplies
      };
    });
  };

  // นับจำนวนความคิดเห็นทั้งหมด (รวมคำตอบ)
  const countAllComments = (formattedComments) => {
    let count = formattedComments.length;
    formattedComments.forEach(comment => {
      if (comment.replies && comment.replies.length > 0) {
        count += comment.replies.length;
      }
    });
    return count;
  };

  // ดึงข้อมูลความคิดเห็นเมื่อโพสต์ ID เปลี่ยนหรือเมื่อแสดงความคิดเห็น
  useEffect(() => {
    if (showComments) {
      fetchComments();
    } else {
      // ดึงเฉพาะจำนวนความคิดเห็น
      fetchCommentCount();
    }
  }, [postId, showComments]);

  // ดึงจำนวนความคิดเห็น
  const fetchCommentCount = async () => {
    if (!postId) return;
    
    try {
      const response = await axios.get(`http://localhost:8080/api/comments/count/${postId}`);
      setCommentCount(response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงจำนวนความคิดเห็น:", error);
    }
  };

  // ฟังก์ชันสำหรับส่งความคิดเห็นใหม่
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    if (!postId) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      // สร้างข้อมูลความคิดเห็น
      const commentData = {
        postId: postId,
        text: newComment,
        username: "golden", // ใช้ค่าคงที่ (ควรใช้ระบบยืนยันตัวตนจริง)
        timestamp: Date.now()
      };
      
      // ส่งคำขอสร้างความคิดเห็นไปยัง API
      const response = await axios.post("http://localhost:8080/api/comments", commentData);
      
      // เพิ่มความคิดเห็นใหม่เข้าไปที่รายการ
      setComments(prevComments => [...prevComments, { ...response.data, replies: [] }]);
      setCommentCount(prevCount => prevCount + 1);
      
      // ล้างช่องข้อความ
      setNewComment("");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างความคิดเห็น:", error);
      setError("ไม่สามารถส่งความคิดเห็นได้");
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันสำหรับส่งคำตอบความคิดเห็น
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    if (!replyText.trim() || !replyingTo) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      // สร้างข้อมูลคำตอบ
      const replyData = {
        postId: postId,
        parentId: replyingTo.id, // อ้างอิงถึงความคิดเห็นต้นทาง
        text: replyText,
        username: "golden", // ใช้ค่าคงที่
        timestamp: Date.now()
      };
      
      // ส่งคำขอสร้างคำตอบไปยัง API
      const response = await axios.post("http://localhost:8080/api/comments", replyData);
      
      // อัปเดตความคิดเห็นในสถานะ
      setComments(prevComments => {
        return prevComments.map(comment => {
          if (comment.id === replyingTo.id) {
            // เพิ่มคำตอบลงในความคิดเห็นที่ตอบกลับ
            const updatedReplies = [...(comment.replies || []), response.data];
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
      });
      
      // อัปเดตจำนวนความคิดเห็น
      setCommentCount(prevCount => prevCount + 1);
      
      // ล้างช่องข้อความและออกจากโหมดตอบกลับ
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างคำตอบ:", error);
      setError("ไม่สามารถส่งคำตอบได้");
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันสำหรับลบความคิดเห็น
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบความคิดเห็นนี้?")) {
      return;
    }
    
    try {
      // ส่งคำขอลบความคิดเห็น
      await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
      
      // ตรวจสอบว่าเป็นความคิดเห็นหลักหรือคำตอบ
      const isMainComment = comments.some(comment => comment.id === commentId);
      
      if (isMainComment) {
        // ลบความคิดเห็นหลักและคำตอบทั้งหมดที่เกี่ยวข้อง
        const commentToDelete = comments.find(comment => comment.id === commentId);
        const replyCount = commentToDelete.replies ? commentToDelete.replies.length : 0;
        
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        setCommentCount(prevCount => prevCount - 1 - replyCount);
      } else {
        // ลบคำตอบ
        setComments(prevComments => {
          return prevComments.map(comment => {
            if (comment.replies && comment.replies.some(reply => reply.id === commentId)) {
              const updatedReplies = comment.replies.filter(reply => reply.id !== commentId);
              return { ...comment, replies: updatedReplies };
            }
            return comment;
          });
        });
        setCommentCount(prevCount => prevCount - 1);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบความคิดเห็น:", error);
      alert("ไม่สามารถลบความคิดเห็นได้");
    }
  };

  // ฟังก์ชันเริ่มตอบกลับความคิดเห็น
  const handleReplyClick = (comment) => {
    setReplyingTo(comment);
    setReplyText("");
  };

  // ฟังก์ชันยกเลิกการตอบกลับ
  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  // ฟังก์ชันคำนวณเวลาที่แสดง
  const formatCommentTime = (timestamp) => {
    if (!timestamp) return "เมื่อสักครู่";
    
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 60) return "เมื่อสักครู่";
    
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`;
    
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} ชั่วโมงที่แล้ว`;
    
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} วันที่แล้ว`;
  };

  return (
    <div className="comments-section">
      {/* ปุ่มแสดง/ซ่อนความคิดเห็น */}
      <button 
        className="comments-toggle" 
        onClick={() => setShowComments(!showComments)}
      >
        {commentCount > 0 
          ? `${commentCount} ความคิดเห็น` 
          : "เพิ่มความคิดเห็น"}
      </button>
      
      {/* ฟอร์มสำหรับส่งความคิดเห็นใหม่ */}
      <form className="comment-form" onSubmit={handleSubmitComment}>
        <img src={Image} alt="Profile" className="comment-avatar" />
        <input
          type="text"
          className="comment-input"
          placeholder="เขียนความคิดเห็น..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          type="submit" 
          className="comment-submit"
          disabled={!newComment.trim() || isLoading}
        >
          {isLoading ? "กำลังส่ง..." : "ส่ง"}
        </button>
      </form>
      
      {/* แสดงข้อผิดพลาด */}
      {error && <div className="comments-error">{error}</div>}
      
      {/* รายการความคิดเห็น */}
      {showComments && (
        <div className="comment-list">
          {isLoading && comments.length === 0 ? (
            <div className="comments-loading">กำลังโหลดความคิดเห็น...</div>
          ) : comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="comment-thread">
                <div className="comment-item">
                  <img src={Image} alt="Profile" className="comment-avatar" />
                  <div className="comment-content">
                    <div className="comment-bubble">
                      <span className="comment-username">{comment.username}</span>
                      {comment.text}
                    </div>
                    <div className="comment-footer">
                      <span className="comment-time">{formatCommentTime(comment.timestamp)}</span>
                      <div className="comment-actions">
                        <button className="comment-action">ถูกใจ</button>
                        <button 
                          className="comment-action" 
                          onClick={() => handleReplyClick(comment)}
                        >
                          ตอบกลับ
                        </button>
                        <button 
                          className="comment-delete-btn"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ฟอร์มตอบกลับสำหรับความคิดเห็นนี้ */}
                {replyingTo && replyingTo.id === comment.id && (
                  <div className="reply-form-container">
                    <form className="comment-form reply-form" onSubmit={handleSubmitReply}>
                      <img src={Image} alt="Profile" className="comment-avatar reply-avatar" />
                      <div className="reply-input-container">
                        <input
                          type="text"
                          className="comment-input reply-input"
                          placeholder={`ตอบกลับ ${replyingTo.username}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          autoFocus
                        />
                        <div className="reply-form-buttons">
                          <button 
                            type="button" 
                            className="reply-cancel-btn"
                            onClick={cancelReply}
                          >
                            ยกเลิก
                          </button>
                          <button 
                            type="submit" 
                            className="comment-submit reply-submit"
                            disabled={!replyText.trim() || isLoading}
                          >
                            ตอบกลับ
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* แสดงคำตอบของความคิดเห็นนี้ */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies-container">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="comment-item reply-item">
                        <img src={Image} alt="Profile" className="comment-avatar reply-avatar" />
                        <div className="comment-content">
                          <div className="comment-bubble reply-bubble">
                            <span className="comment-username">{reply.username}</span>
                            {reply.text}
                          </div>
                          <div className="comment-footer">
                            <span className="comment-time">{formatCommentTime(reply.timestamp)}</span>
                            <div className="comment-actions">
                              <button className="comment-action">ถูกใจ</button>
                              <button 
                                className="comment-delete-btn"
                                onClick={() => handleDeleteComment(reply.id)}
                              >
                                ลบ
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="comments-loading">ยังไม่มีความคิดเห็น</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;