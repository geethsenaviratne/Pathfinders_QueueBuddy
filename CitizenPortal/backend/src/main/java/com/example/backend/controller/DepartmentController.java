package com.example.backend.controller;

import com.example.backend.dto.DepartmentDto;
import com.example.backend.service.DepartmentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
@PreAuthorize("hasRole('CITIZEN')")
public class DepartmentController {
    private final DepartmentService service;
    public DepartmentController(DepartmentService service) { this.service = service; }

    @GetMapping
    public List<DepartmentDto> list() {
        return service.list();
    }
}
