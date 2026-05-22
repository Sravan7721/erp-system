package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Recruitment;
import com.erp.erpbackend.repository.RecruitmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/recruitment")

@CrossOrigin(origins = "http://localhost:3000")

public class RecruitmentController {

    @Autowired
    private RecruitmentRepository recruitmentRepository;

    // GET ALL

    @GetMapping
    public List<Recruitment> getCandidates() {

        return recruitmentRepository.findAll();
    }

    // ADD

    @PostMapping
    public Recruitment addCandidate(
            @RequestBody Recruitment recruitment
    ) {

        return recruitmentRepository.save(recruitment);
    }

    // DELETE

    @DeleteMapping("/{id}")

    public void deleteCandidate(
            @PathVariable Long id
    ) {

        recruitmentRepository.deleteById(id);
    }
}