package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Finance;
import com.erp.erpbackend.repository.FinanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/finance")

@CrossOrigin(origins = "http://localhost:3000")

public class FinanceController {

    @Autowired
    private FinanceRepository financeRepository;

    // GET ALL

    @GetMapping
    public List<Finance> getFinance() {

        return financeRepository.findAll();
    }

    // ADD

    @PostMapping
    public Finance addFinance(
            @RequestBody Finance finance
    ) {

        return financeRepository.save(finance);
    }

    // DELETE

    @DeleteMapping("/{id}")

    public void deleteFinance(
            @PathVariable Long id
    ) {

        financeRepository.deleteById(id);
    }
}