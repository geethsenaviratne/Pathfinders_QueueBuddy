package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admins")
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int adminId;
    @Column(unique = true)
    private String email;
    private String password;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userTypeId", referencedColumnName = "userTypeId")
    private UserType userTypeId;

    @OneToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", unique = true)
    private Department department;


    public Admin() {
    }

    public Admin(int adminId, String email, String password, UserType userTypeId, Department department) {
        this.adminId = adminId;
        this.email = email;
        this.password = password;
        this.userTypeId = userTypeId;
        this.department = department;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", userTypeId=" + userTypeId +
                ", department=" + department +
                '}';
    }

    public int getId() {
        return adminId;
    }

}
