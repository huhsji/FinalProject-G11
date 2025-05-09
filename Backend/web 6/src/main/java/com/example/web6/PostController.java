package com.example.web6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // เพิ่ม CrossOrigin เพื่อแก้ปัญหา CORS
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // GET request เพื่อดึงโพสต์ทั้งหมด
    @GetMapping("/post")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // GET request เพื่อดึงโพสต์ทั้งหมด (endpoint เดิม เพื่อความเข้ากันได้)
    @GetMapping
    public ResponseEntity<List<Post>> getAllPostsOriginal() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // GET request เพื่อดึงโพสต์ตาม ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST request เพื่อสร้างโพสต์ใหม่
    @PostMapping("/newpost")
    public ResponseEntity<Post> createNewPost(@RequestBody Post post) {
        try {
            if (post.getText() == null || post.getText().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            // ใช้ timestamp ที่ส่งมาจาก frontend (ถ้าไม่มีให้ใช้เวลาปัจจุบัน)
            if (post.getTimestamp() == 0) {
                post.setTimestamp(System.currentTimeMillis());
            }

            // ตั้งค่า username ถ้าไม่มี
            if (post.getUsername() == null || post.getUsername().isEmpty()) {
                post.setUsername("golden");
            }

            // ตรวจสอบและตั้งค่าฟิลด์ isPromoPost (ถ้าไม่มีค่า)
            // ไม่จำเป็นต้องตั้งค่านี้เพราะมีค่าเริ่มต้นเป็น false แล้ว

            // แสดง log ข้อมูลโพสต์
            System.out.println("Creating new post: " + post.getText());
            System.out.println("Is promo post: " + post.isPromoPost());
            if (post.isPromoPost()) {
                System.out.println("Linked trip ID: " + post.getLinkedTripId());
                System.out.println("Promo title: " + post.getPromoTitle());
                System.out.println("Promo discount: " + post.getPromoDiscount());
            }

            Post newPost = postService.savePost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
        } catch (Exception e) {
            System.err.println("Error creating post: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // POST request เพื่อสร้างโพสต์ใหม่ (endpoint เดิม เพื่อความเข้ากันได้)
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        if (post.getText() == null || post.getText().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // ใช้ timestamp ที่ส่งมาจาก frontend (ถ้าไม่มีให้ใช้เวลาปัจจุบัน)
        if (post.getTimestamp() == 0) {
            post.setTimestamp(System.currentTimeMillis());
        }

        Post newPost = postService.savePost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }

    // PUT request เพื่ออัปเดตโพสต์ที่มีอยู่
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post) {
        Optional<Post> existingPost = postService.getPostById(id);

        if (existingPost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // เก็บ timestamp เดิมไว้
        post.setTimestamp(existingPost.get().getTimestamp());

        post.setId(id);
        Post updatedPost = postService.savePost(post);
        return ResponseEntity.ok(updatedPost);
    }

    // DELETE request เพื่อลบโพสต์
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        Optional<Post> existingPost = postService.getPostById(id);

        if (existingPost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}