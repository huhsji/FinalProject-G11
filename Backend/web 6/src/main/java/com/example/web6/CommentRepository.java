package com.example.web6;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    // ค้นหาความคิดเห็นทั้งหมดของโพสต์
    List<Comment> findByPostId(String postId);

    // ค้นหาความคิดเห็นทั้งหมดของโพสต์เรียงตามเวลา
    List<Comment> findByPostIdOrderByTimestampAsc(String postId);

    // นับจำนวนความคิดเห็นของโพสต์
    long countByPostId(String postId);

    // ค้นหาคำตอบของความคิดเห็น
    List<Comment> findByParentId(String parentId);

    // ค้นหาคำตอบของความคิดเห็นเรียงตามเวลา
    List<Comment> findByParentIdOrderByTimestampAsc(String parentId);

    // นับจำนวนคำตอบของความคิดเห็น
    long countByParentId(String parentId);

    // ลบคำตอบทั้งหมดของความคิดเห็น
    void deleteByParentId(String parentId);
}