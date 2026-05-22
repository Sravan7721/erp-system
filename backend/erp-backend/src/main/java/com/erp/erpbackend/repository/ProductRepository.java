package com.erp.erpbackend.repository;

import com.erp.erpbackend.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

}