package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Leave;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepository
        extends JpaRepository<Leave, Long> {

}