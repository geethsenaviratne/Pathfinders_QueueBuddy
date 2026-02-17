package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "government_officers")
@Getter
@Setter
public class GovernmentOfficer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int officerId;
    private String email;
    private String password;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userTypeId", referencedColumnName = "userTypeId")
    private UserType userTypeId;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id")
    private Department department;

    public GovernmentOfficer() {
    }

    public GovernmentOfficer(int officerId, String email, String password, UserType userTypeId, Department department) {
        this.officerId = officerId;
        this.email = email;
        this.password = password;
        this.userTypeId = userTypeId;
        this.department = department;
    }

    @Override
    public String toString() {
        return "GovernmentOfficer{" +
                "officerId=" + officerId +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", userTypeId=" + userTypeId +
                ", department=" + department +
                '}';
    }
    public int getId() {
        return officerId;
    }

}
