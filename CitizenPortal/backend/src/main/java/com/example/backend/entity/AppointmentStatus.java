package com.example.backend.entity;

public enum AppointmentStatus {
    BOOKED,        // Active future appointment
    CANCELLED,     // User-initiated or admin-initiated cancellation
    COMPLETED,     // Marked by officer/admin after service done
    NO_SHOW        // Marked by officer/admin if citizen didn’t attend
}
