package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Leave;
import com.erp.erpbackend.repository.LeaveRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:3000")

public class LeaveController {

    @Autowired
    private LeaveRepository leaveRepository;

    // GET

    @GetMapping

    public List<Leave> getLeaves() {

        return leaveRepository.findAll();
    }

    // ADD

    @PostMapping

    public Leave addLeave(
            @RequestBody Leave leave
    ) {

        return leaveRepository.save(leave);
    }

    // DELETE

    @DeleteMapping("/{id}")

    public String deleteLeave(
            @PathVariable Long id
    ) {

        leaveRepository.deleteById(id);

        return "Deleted";
    }
}