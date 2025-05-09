package com.example.web6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // ดึงความคิดเห็นทั้งหมดของโพสต์
    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostIdOrderByTimestampAsc(postId);
    }

    // ดึงจำนวนความคิดเห็นของโพสต์
    public long getCommentCountByPostId(String postId) {
        return commentRepository.countByPostId(postId);
    }

    // ดึงความคิดเห็นตาม ID
    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    // บันทึกความคิดเห็น (สร้างใหม่หรืออัปเดต)
    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // ลบความคิดเห็น
    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }

    // ดึงคำตอบของความคิดเห็นหลัก
    public List<Comment> getRepliesByParentId(String parentId) {
        return commentRepository.findByParentIdOrderByTimestampAsc(parentId);
    }

    // นับจำนวนคำตอบของความคิดเห็นหลัก
    public long getReplyCountByParentId(String parentId) {
        return commentRepository.countByParentId(parentId);
    }

    // ลบคำตอบทั้งหมดของความคิดเห็นหลัก
    @Transactional
    public void deleteRepliesByParentId(String parentId) {
        commentRepository.deleteByParentId(parentId);
    }
}