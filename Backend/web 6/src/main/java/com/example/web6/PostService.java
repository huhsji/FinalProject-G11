package com.example.web6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // เพิ่มเมธอดสำหรับค้นหาโพสต์ตาม ID
    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    // เพิ่มเมธอดสำหรับบันทึกหรืออัปเดตโพสต์
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    // เพิ่มเมธอดสำหรับลบโพสต์
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

    // สร้างโพสต์ที่มีแค่ข้อความ (สำหรับความเข้ากันได้กับโค้ดเดิม)
    public Post createPost(String text) {
        Post newPost = new Post(text);
        return postRepository.save(newPost);
    }

    // สร้างโพสต์แบบสมบูรณ์
    public Post createPost(Post post) {
        return postRepository.save(post);
    }
}