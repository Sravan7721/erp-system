package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Department;

import com.erp.erpbackend.repository.DepartmentRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/departments")

@CrossOrigin(origins = "http://localhost:3000")

public class DepartmentController {

    @Autowired

    private DepartmentRepository departmentRepository;

    // GET ALL DEPARTMENTS

    @GetMapping

    public List<Department> getDepartments() {

        return departmentRepository.findAll();
    }

    // ADD DEPARTMENT

    @PostMapping

    public Department addDepartment(
            @RequestBody Department department
    ) {

        return departmentRepository.save(department);
    }

    // DELETE DEPARTMENT

    @DeleteMapping("/{id}")

    public String deleteDepartment(
            @PathVariable Long id
    ) {

        departmentRepository.deleteById(id);

        return "Department Deleted";
    }
}