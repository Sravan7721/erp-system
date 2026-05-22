package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Performance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRepository
        extends JpaRepository<Performance, Long> {
}