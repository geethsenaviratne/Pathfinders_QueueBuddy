package com.example.backend.dto;

import com.example.backend.entity.AppointmentStatus;
import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentSummaryDto(
        Integer id,
        String departmentName,
        LocalDate date,
        LocalTime time,
        AppointmentStatus status
) {}
