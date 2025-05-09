package com.example.web6;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String text;
    private String username;
    private String content;
    private String imageUrl;
    private long timestamp; // เก็บเวลาเป็น milliseconds

    // ฟิลด์สำหรับโพสต์โปรโมชั่น
    private Boolean isPromoPost = false; // เปลี่ยนจาก boolean เป็น Boolean เพื่อให้มีค่า null ได้
    private String linkedTripId = "";
    private String promoTitle = "";
    private String promoDiscount = "";

    // Default constructor
    public Post() {
        this.timestamp = System.currentTimeMillis();
    }

    // Constructor ที่รับพารามิเตอร์หลัก
    public Post(String text, String username, String content, String imageUrl) {
        this.text = text;
        this.username = username;
        this.content = content;
        this.imageUrl = imageUrl;
        this.timestamp = System.currentTimeMillis();
    }

    // Constructor ที่รับแค่ text
    public Post(String text) {
        this.text = text;
        this.timestamp = System.currentTimeMillis();
    }

    // Getters and setters
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    // Getters and setters สำหรับฟิลด์ใหม่
    public Boolean getIsPromoPost() {
        return isPromoPost;
    }

    public void setIsPromoPost(Boolean isPromoPost) {
        this.isPromoPost = isPromoPost != null ? isPromoPost : false;
    }

    public String getLinkedTripId() {
        return linkedTripId;
    }

    public void setLinkedTripId(String linkedTripId) {
        this.linkedTripId = linkedTripId != null ? linkedTripId : "";
    }

    public String getPromoTitle() {
        return promoTitle;
    }

    public void setPromoTitle(String promoTitle) {
        this.promoTitle = promoTitle != null ? promoTitle : "";
    }

    public String getPromoDiscount() {
        return promoDiscount;
    }

    public void setPromoDiscount(String promoDiscount) {
        this.promoDiscount = promoDiscount != null ? promoDiscount : "";
    }

    // สำหรับความเข้ากันได้กับโค้ดเดิมที่อาจเรียกใช้
    public boolean isPromoPost() {
        return isPromoPost != null ? isPromoPost : false;
    }

    public void setPromoPost(boolean promoPost) {
        this.isPromoPost = promoPost;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", text='" + text + '\'' +
                ", username='" + username + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", isPromoPost=" + isPromoPost +
                ", linkedTripId='" + linkedTripId + '\'' +
                ", promoTitle='" + promoTitle + '\'' +
                ", promoDiscount='" + promoDiscount + '\'' +
                '}';
    }
}