package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Attendance;
import com.erp.erpbackend.repository.AttendanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")

public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // GET ALL

    @GetMapping

    public List<Attendance> getAttendance() {

        return attendanceRepository.findAll();
    }

    // ADD

    @PostMapping

    public Attendance addAttendance(
            @RequestBody Attendance attendance
    ) {

        return attendanceRepository.save(attendance);
    }

    // DELETE

    @DeleteMapping("/{id}")

    public String deleteAttendance(
            @PathVariable Long id
    ) {

        attendanceRepository.deleteById(id);

        return "Deleted";
    }
}