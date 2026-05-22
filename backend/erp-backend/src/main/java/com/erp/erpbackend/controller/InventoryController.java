package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Inventory;
import com.erp.erpbackend.repository.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/inventory")

@CrossOrigin(origins = "http://localhost:3000")

public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    // GET ALL

    @GetMapping
    public List<Inventory> getInventory() {

        return inventoryRepository.findAll();
    }

    // ADD

    @PostMapping
    public Inventory addInventory(
            @RequestBody Inventory inventory
    ) {

        return inventoryRepository.save(inventory);
    }

    // DELETE

    @DeleteMapping("/{id}")

    public void deleteInventory(
            @PathVariable Long id
    ) {

        inventoryRepository.deleteById(id);
    }
}