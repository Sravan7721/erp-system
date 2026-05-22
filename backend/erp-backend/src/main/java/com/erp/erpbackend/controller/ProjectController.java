package com.erp.erpbackend.controller;

import com.erp.erpbackend.entity.Project;
import com.erp.erpbackend.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")

@CrossOrigin(origins = "http://localhost:3000")

public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // GET ALL PROJECTS

    @GetMapping
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    // ADD PROJECT

    @PostMapping
    public Project addProject(
            @RequestBody Project project
    ) {
        return projectRepository.save(project);
    }

    // DELETE PROJECT

    @DeleteMapping("/{id}")
    public void deleteProject(
            @PathVariable Long id
    ) {
        projectRepository.deleteById(id);
    }
}