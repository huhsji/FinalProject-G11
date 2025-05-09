package com.example.web6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // GET request เพื่อดึงความคิดเห็นทั้งหมดของโพสต์ (รวมคำตอบ)
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable String postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // GET request เพื่อดึงจำนวนความคิดเห็นของโพสต์
    @GetMapping("/count/{postId}")
    public ResponseEntity<Long> getCommentCountByPostId(@PathVariable String postId) {
        long count = commentService.getCommentCountByPostId(postId);
        return ResponseEntity.ok(count);
    }

    // POST request เพื่อสร้างความคิดเห็นใหม่ (หรือคำตอบ)
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        if (comment.getText() == null || comment.getText().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // ตั้งค่า timestamp เป็นเวลาปัจจุบัน
        comment.setTimestamp(System.currentTimeMillis());

        // ตั้งค่า username ถ้าไม่มี
        if (comment.getUsername() == null || comment.getUsername().isEmpty()) {
            comment.setUsername("golden");
        }

        // ตรวจสอบประเภทของความคิดเห็น (หลักหรือคำตอบ)
        if (comment.getParentId() != null && !comment.getParentId().isEmpty()) {
            // เป็นการตอบกลับความคิดเห็น ต้องตรวจสอบว่ามีความคิดเห็นหลักหรือไม่
            Optional<Comment> parentComment = commentService.getCommentById(comment.getParentId());
            if (parentComment.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);
            }
        }

        Comment newComment = commentService.saveComment(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
    }

    // PUT request เพื่ออัปเดตความคิดเห็น
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable String id, @RequestBody Comment comment) {
        Optional<Comment> existingComment = commentService.getCommentById(id);

        if (existingComment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // เก็บค่าเดิมบางส่วน
        comment.setId(id);
        comment.setPostId(existingComment.get().getPostId());
        comment.setParentId(existingComment.get().getParentId()); // เก็บค่า parentId เดิม
        comment.setUsername(existingComment.get().getUsername());
        comment.setTimestamp(existingComment.get().getTimestamp());

        Comment updatedComment = commentService.saveComment(comment);
        return ResponseEntity.ok(updatedComment);
    }

    // DELETE request เพื่อลบความคิดเห็น และคำตอบที่เกี่ยวข้อง
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        Optional<Comment> existingComment = commentService.getCommentById(id);

        if (existingComment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // ลบความคิดเห็น
        commentService.deleteComment(id);

        // ถ้าเป็นความคิดเห็นหลัก ให้ลบคำตอบทั้งหมดด้วย
        if (existingComment.get().getParentId() == null || existingComment.get().getParentId().isEmpty()) {
            commentService.deleteRepliesByParentId(id);
        }

        return ResponseEntity.noContent().build();
    }

    // GET request เพื่อดึงคำตอบของความคิดเห็นหลัก
    @GetMapping("/replies/{parentId}")
    public ResponseEntity<List<Comment>> getRepliesByParentId(@PathVariable String parentId) {
        List<Comment> replies = commentService.getRepliesByParentId(parentId);
        return ResponseEntity.ok(replies);
    }

    // GET request เพื่อดึงจำนวนคำตอบของความคิดเห็นหลัก
    @GetMapping("/replies/count/{parentId}")
    public ResponseEntity<Long> getReplyCountByParentId(@PathVariable String parentId) {
        long count = commentService.getReplyCountByParentId(parentId);
        return ResponseEntity.ok(count);
    }
}