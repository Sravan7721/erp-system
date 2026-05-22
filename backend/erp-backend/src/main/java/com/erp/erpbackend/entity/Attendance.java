package com.erp.erpbackend.entity;

import jakarta.persistence.*;

@Entity

public class Attendance {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String employeeName;

    private String department;

    private String status;

    private String date;

    public Long getId() {
        return id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getDepartment() {
        return department;
    }

    public String getStatus() {
        return status;
    }

    public String getDate() {
        return date;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDate(String date) {
        this.date = date;
    }
}