package com.example.backend.service;

import com.example.backend.dto.DepartmentDto;
import com.example.backend.entity.Department;
import com.example.backend.repository.DepartmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository repo;
    public DepartmentService(DepartmentRepository repo) { this.repo = repo; }

    public List<DepartmentDto> list() {
        return repo.findAll().stream()
                .map(d -> new DepartmentDto(d.getDepartmentId(), d.getDepartment_name(), d.getDepartment_code()))
                .toList();
    }
}
