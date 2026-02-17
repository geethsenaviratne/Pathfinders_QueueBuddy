package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "user_types")
@Getter
@Setter
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userTypeId;
    private String userTypeName;

    @OneToMany(targetEntity = Users.class, mappedBy = "userTypeId", cascade = CascadeType.ALL)
    private List<Users> users;

    @OneToMany(targetEntity = Admin.class, mappedBy = "userTypeId", cascade = CascadeType.ALL)
    private List<Admin> admins;

    @OneToMany(targetEntity = GovernmentOfficer.class, mappedBy = "userTypeId", cascade = CascadeType.ALL)
    private List<GovernmentOfficer> officers;


    public UserType(int userTypeId, String userTypeName, List<Users> users, List<Admin> admins, List<GovernmentOfficer> officers) {
        this.userTypeId = userTypeId;
        this.userTypeName = userTypeName;
        this.users = users;
        this.admins = admins;
        this.officers = officers;
    }

    public UserType() {

    }

    @Override
    public String toString() {
        return "UserType{" +
                "userTypeId=" + userTypeId +
                ", userTypeName='" + userTypeName + '\'' +
                ", users=" + users +
                ", admins=" + admins +
                ", officers=" + officers +
                '}';
    }
}
