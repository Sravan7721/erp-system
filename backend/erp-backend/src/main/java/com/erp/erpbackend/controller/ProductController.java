package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Product;

import com.erp.erpbackend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/products")

@CrossOrigin(origins = "*")

public class ProductController {

    @Autowired

    private ProductRepository productRepository;

    // GET ALL PRODUCTS

    @GetMapping

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    // ADD PRODUCT

    @PostMapping

    public Product addProduct(
            @RequestBody Product product
    ) {

        return productRepository.save(product);
    }

    // DELETE PRODUCT

    @DeleteMapping("/{id}")

    public void deleteProduct(
            @PathVariable Long id
    ) {

        productRepository.deleteById(id);
    }
}