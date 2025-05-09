package com.example.web6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    // ดึงการลงทะเบียนทั้งหมด
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    // ดึงการลงทะเบียนตาม ID
    public Optional<Registration> getRegistrationById(String id) {
        return registrationRepository.findById(id);
    }

    // ดึงการลงทะเบียนตาม tripId
    public List<Registration> getRegistrationsByTripId(String tripId) {
        return registrationRepository.findByTripId(tripId);
    }

    // นับจำนวนผู้เข้าร่วมทั้งหมดสำหรับทริป
    public int getTotalParticipantsByTripId(String tripId) {
        List<Registration> registrations = registrationRepository.findByTripId(tripId);
        return registrations.stream()
                .mapToInt(Registration::getParticipants)
                .sum();
    }

    // บันทึกการลงทะเบียน (สร้างใหม่หรืออัปเดต)
    public Registration saveRegistration(Registration registration) {
        return registrationRepository.save(registration);
    }

    // ลบการลงทะเบียน
    public void deleteRegistration(String id) {
        registrationRepository.deleteById(id);
    }

    // ค้นหาการลงทะเบียนตามอีเมล
    public List<Registration> getRegistrationsByEmail(String email) {
        return registrationRepository.findByEmail(email);
    }

    // ค้นหาการลงทะเบียนตามชื่อ
    public List<Registration> getRegistrationsByName(String name) {
        return registrationRepository.findByFullNameContaining(name);
    }
}