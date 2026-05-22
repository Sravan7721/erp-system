package com.erp.erpbackend.entity;

import jakarta.persistence.*;

@Entity

public class Employee {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private String department;

    private Double salary;

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDepartment() {
        return department;
    }

    public Double getSalary() {
        return salary;
    }

    // SETTERS

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}