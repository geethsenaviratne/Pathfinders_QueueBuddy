package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;


import java.util.Date;

@Entity
@Table(name = "Users")
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @DateTimeFormat(pattern = "DD-MM-YYYY")
    @Column(name = "date_created")
    private Date dateCreated;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userTypeId", referencedColumnName = "userTypeId")
    private UserType userTypeId;

    public Users() {
    }

    public Users(int userId, String firstName, String lastName, String email, String password, Date dateCreated,  UserType userTypeId) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userTypeId = userTypeId;
        this.dateCreated = dateCreated;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ",UserType=" + userTypeId +
                ", dateCreated=" + dateCreated +
                '}';
    }

    public int getId() {
        return userId;
    }

}
