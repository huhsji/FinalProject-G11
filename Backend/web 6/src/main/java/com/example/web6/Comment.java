package com.example.web6;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String postId;
    private String parentId;  // เพิ่มฟิลด์สำหรับ parent comment ID
    private String username;
    private String text;
    private long timestamp;

    // Default constructor
    public Comment() {
        this.timestamp = System.currentTimeMillis();
    }

    // Constructor หลัก
    public Comment(String postId, String username, String text) {
        this.postId = postId;
        this.username = username;
        this.text = text;
        this.timestamp = System.currentTimeMillis();
    }

    // Constructor สำหรับคำตอบ (มี parentId)
    public Comment(String postId, String parentId, String username, String text) {
        this.postId = postId;
        this.parentId = parentId;
        this.username = username;
        this.text = text;
        this.timestamp = System.currentTimeMillis();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    // เช็คว่าเป็นความคิดเห็นหลักหรือคำตอบ
    public boolean isReply() {
        return parentId != null && !parentId.isEmpty();
    }
}