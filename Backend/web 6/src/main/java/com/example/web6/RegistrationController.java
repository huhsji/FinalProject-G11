package com.example.web6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // แก้ไขปัญหา CORS
@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // GET request เพื่อดึงการลงทะเบียนทั้งหมด
    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        List<Registration> registrations = registrationService.getAllRegistrations();
        return ResponseEntity.ok(registrations);
    }

    // GET request เพื่อดึงการลงทะเบียนตาม ID
    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable String id) {
        Optional<Registration> registration = registrationService.getRegistrationById(id);
        return registration.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET request เพื่อดึงการลงทะเบียนตาม tripId
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Registration>> getRegistrationsByTripId(@PathVariable String tripId) {
        List<Registration> registrations = registrationService.getRegistrationsByTripId(tripId);
        return ResponseEntity.ok(registrations);
    }

    // GET request เพื่อนับจำนวนผู้เข้าร่วมทั้งหมดตาม tripId
    @GetMapping("/trip/{tripId}/count")
    public ResponseEntity<Map<String, Integer>> getParticipantCountByTripId(@PathVariable String tripId) {
        int count = registrationService.getTotalParticipantsByTripId(tripId);
        Map<String, Integer> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    // POST request เพื่อสร้างการลงทะเบียนใหม่
    @PostMapping
    public ResponseEntity<Registration> createRegistration(@RequestBody Registration registration) {
        // ตรวจสอบข้อมูลที่จำเป็น
        if (registration.getTripId() == null || registration.getFullName() == null ||
                registration.getEmail() == null || registration.getPhoneNumber() == null) {
            return ResponseEntity.badRequest().build();
        }

        Registration newRegistration = registrationService.saveRegistration(registration);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRegistration);
    }

    // PUT request เพื่ออัปเดตการลงทะเบียนที่มีอยู่
    @PutMapping("/{id}")
    public ResponseEntity<Registration> updateRegistration(@PathVariable String id, @RequestBody Registration registration) {
        Optional<Registration> existingRegistration = registrationService.getRegistrationById(id);

        if (existingRegistration.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        registration.setId(id);
        Registration updatedRegistration = registrationService.saveRegistration(registration);
        return ResponseEntity.ok(updatedRegistration);
    }

    // DELETE request เพื่อลบการลงทะเบียน
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable String id) {
        Optional<Registration> existingRegistration = registrationService.getRegistrationById(id);

        if (existingRegistration.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        registrationService.deleteRegistration(id);
        return ResponseEntity.noContent().build();
    }

    // GET request เพื่อค้นหาการลงทะเบียนตามอีเมล
    @GetMapping("/search/email")
    public ResponseEntity<List<Registration>> searchRegistrationsByEmail(@RequestParam String email) {
        List<Registration> registrations = registrationService.getRegistrationsByEmail(email);
        return ResponseEntity.ok(registrations);
    }

    // GET request เพื่อค้นหาการลงทะเบียนตามชื่อ
    @GetMapping("/search/name")
    public ResponseEntity<List<Registration>> searchRegistrationsByName(@RequestParam String name) {
        List<Registration> registrations = registrationService.getRegistrationsByName(name);
        return ResponseEntity.ok(registrations);
    }
}