package com.erp.erpbackend.entity;

import jakarta.persistence.*;

@Entity

public class Leave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String employeeName;

    private String department;

    private String leaveType;

    private String fromDate;

    private String toDate;

    private String reason;

    private String status;

    public Long getId() {
        return id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getDepartment() {
        return department;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public String getFromDate() {
        return fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public String getReason() {
        return reason;
    }

    public String getStatus() {
        return status;
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

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}