package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Salary;
import com.erp.erpbackend.repository.SalaryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/salaries")

@CrossOrigin(origins = "http://localhost:3000")

public class SalaryController {

    @Autowired

    private SalaryRepository salaryRepository;

    // GET ALL SALARIES

    @GetMapping

    public List<Salary> getAllSalaries() {

        return salaryRepository.findAll();
    }

    // ADD SALARY

    @PostMapping

    public Salary addSalary(
            @RequestBody Salary salary
    ) {

        return salaryRepository.save(salary);
    }

    // DELETE SALARY

    @DeleteMapping("/{id}")

    public String deleteSalary(
            @PathVariable Long id
    ) {

        salaryRepository.deleteById(id);

        return "Salary Deleted";
    }
}