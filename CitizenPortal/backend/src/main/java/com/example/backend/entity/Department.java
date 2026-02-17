package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "departments")
@Getter
@Setter
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private Integer departmentId;

    private String department_name;
    private String department_code;

    @OneToOne(targetEntity = Admin.class, mappedBy = "department", cascade = CascadeType.ALL)
    private Admin admin;

    @OneToMany(targetEntity = GovernmentOfficer.class, mappedBy = "department", cascade = CascadeType.ALL)
    private List<GovernmentOfficer> officers;

    public Department() {
    }

    public Department(Integer departmentId, String department_name, String department_code, Admin admin, List<GovernmentOfficer> officers) {
        this.departmentId = departmentId;
        this.department_name = department_name;
        this.department_code = department_code;
        this.admin = admin;
        this.officers = officers;
    }

    @Override
    public String toString() {
        return "Department{" +
                "departmentId=" + departmentId +
                ", department_name='" + department_name + '\'' +
                ", department_code='" + department_code + '\'' +
                ", admin=" + admin +
                ", officers=" + officers +
                '}';
    }
}