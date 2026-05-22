package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Finance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FinanceRepository
        extends JpaRepository<Finance, Long> {
}