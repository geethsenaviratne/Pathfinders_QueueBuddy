package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter
@Entity @Table(name = "appointments")
public class Appointment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Integer appointmentId;

    @Column(name = "department_id")
    private Integer departmentId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "appointment_date")
    private LocalDate appointmentDate;

    @Column(name = "appointment_time")
    private LocalTime appointmentTime;

    @Column(name = "booked_date")
    private Instant bookedDate;

    @Column(name = "queue_place")
    private Integer queuePlace;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24)
    private AppointmentStatus status = AppointmentStatus.BOOKED;
}