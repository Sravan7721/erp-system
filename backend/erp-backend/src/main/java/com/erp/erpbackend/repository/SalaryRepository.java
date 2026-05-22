package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Salary;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryRepository
        extends JpaRepository<Salary, Long> {
}