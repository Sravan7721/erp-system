package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Task;
import com.erp.erpbackend.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/tasks")

@CrossOrigin(origins = "http://localhost:3000")

public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // GET TASKS

    @GetMapping
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    // ADD TASK

    @PostMapping
    public Task addTask(
            @RequestBody Task task
    ) {
        return taskRepository.save(task);
    }

    // DELETE TASK

    @DeleteMapping("/{id}")
    public void deleteTask(
            @PathVariable Long id
    ) {
        taskRepository.deleteById(id);
    }
}