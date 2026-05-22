package com.erp.erpbackend.entity;

import jakarta.persistence.*;

@Entity

public class Salary {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String employeeName;

    private String department;

    private Double salary;

    // GETTERS

    public Long getId() {
        return id;
    }

    public String getEmployeeName() {
        return employeeName;
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

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}