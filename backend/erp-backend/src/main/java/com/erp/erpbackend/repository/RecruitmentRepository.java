package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Recruitment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitmentRepository
        extends JpaRepository<Recruitment, Long> {
}