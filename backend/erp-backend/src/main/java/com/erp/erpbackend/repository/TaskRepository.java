package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Task;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository
        extends JpaRepository<Task, Long> {
}