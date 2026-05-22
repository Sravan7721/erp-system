package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Inventory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {
}