package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Employee;

import com.erp.erpbackend.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/employees")

@CrossOrigin(origins = "http://localhost:3000")

public class EmployeeController {

    @Autowired

    private EmployeeRepository employeeRepository;

    // GET ALL EMPLOYEES

    @GetMapping

    public List<Employee> getEmployees() {

        return employeeRepository.findAll();
    }

    // ADD EMPLOYEE

    @PostMapping

    public Employee addEmployee(
            @RequestBody Employee employee
    ) {

        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")

    public Employee updateEmployee(

            @PathVariable Long id,

            @RequestBody Employee updatedEmployee
    ) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow();

        employee.setName(
                updatedEmployee.getName()
        );

        employee.setDepartment(
                updatedEmployee.getDepartment()
        );

        employee.setSalary(
                updatedEmployee.getSalary()
        );

        return employeeRepository.save(employee);
    }

    // DELETE EMPLOYEE

    @DeleteMapping("/{id}")

    public String deleteEmployee(
            @PathVariable Long id
    ) {

        employeeRepository.deleteById(id);

        return "Employee Deleted";
    }
}