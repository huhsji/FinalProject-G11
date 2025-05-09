package com.example.web6;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RegistrationRepository extends MongoRepository<Registration, String> {
    // ค้นหาการลงทะเบียนตาม tripId
    List<Registration> findByTripId(String tripId);

    // ค้นหาการลงทะเบียนตามอีเมล
    List<Registration> findByEmail(String email);

    // นับจำนวนผู้เข้าร่วมทั้งหมดตาม tripId
    int countByTripId(String tripId);

    // ค้นหาการลงทะเบียนโดยใช้ชื่อเต็ม (เพื่อค้นหาข้อมูลผู้ใช้)
    List<Registration> findByFullNameContaining(String fullName);
}