package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Department;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository
        extends JpaRepository<Department, Long> {
}