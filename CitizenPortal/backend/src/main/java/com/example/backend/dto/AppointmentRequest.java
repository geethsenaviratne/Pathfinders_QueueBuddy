package com.example.backend.dto;

import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentRequest(
        @NotNull Integer departmentId,
        @NotNull LocalDate appointmentDate,
        @NotNull LocalTime appointmentTime

) {}