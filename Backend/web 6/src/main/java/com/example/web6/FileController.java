package com.example.web6;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // เพิ่ม CrossOrigin เพื่อแก้ปัญหา CORS
@RequestMapping("/api/files")
public class FileController {

    // กำหนดโฟลเดอร์สำหรับเก็บไฟล์อัปโหลด (สามารถกำหนดใน application.properties)
    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    // อัปโหลดไฟล์รูปภาพ
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();

        if (file.isEmpty()) {
            response.put("error", "กรุณาเลือกไฟล์ที่ต้องการอัปโหลด");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // สร้างชื่อไฟล์ให้ไม่ซ้ำกัน
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + fileExtension;

            // สร้างโฟลเดอร์สำหรับเก็บไฟล์ (ถ้ายังไม่มี)
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // บันทึกไฟล์
            Path filePath = Paths.get(uploadDir, newFilename);
            Files.write(filePath, file.getBytes());

            // สร้าง URL สำหรับเข้าถึงไฟล์
            String fileUrl = "/api/files/" + newFilename;

            response.put("filename", newFilename);
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            response.put("error", "ไม่สามารถอัปโหลดไฟล์ได้: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // ดาวน์โหลดไฟล์รูปภาพ
    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir, filename);
            byte[] fileContent = Files.readAllBytes(filePath);

            // ตรวจสอบประเภทของไฟล์
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                // ถ้าไม่สามารถระบุประเภทได้ ให้ใช้ค่าเริ่มต้น
                contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(fileContent);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}