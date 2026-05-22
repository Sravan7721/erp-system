package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Performance;
import com.erp.erpbackend.repository.PerformanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/performance")

@CrossOrigin(origins = "http://localhost:3000")

public class PerformanceController {

    @Autowired
    private PerformanceRepository performanceRepository;

    // GET ALL

    @GetMapping
    public List<Performance> getPerformance() {

        return performanceRepository.findAll();
    }

    // ADD PERFORMANCE

    @PostMapping
    public Performance addPerformance(
            @RequestBody Performance performance
    ) {

        return performanceRepository.save(performance);
    }

    // DELETE

    @DeleteMapping("/{id}")

    public void deletePerformance(
            @PathVariable Long id
    ) {

        performanceRepository.deleteById(id);
    }
}