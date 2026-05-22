package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {
}