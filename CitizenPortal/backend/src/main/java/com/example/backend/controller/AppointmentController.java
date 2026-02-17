package com.example.backend.controller;

import com.example.backend.dto.AppointmentRequest;
import com.example.backend.dto.AppointmentSummaryDto;
import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.CancelRequest;
import com.example.backend.dto.RescheduleRequest;
import com.example.backend.entity.AppointmentStatus;
import com.example.backend.entity.Users;
import com.example.backend.service.AppointmentService;
import com.example.backend.service.UsersService;
import com.example.backend.util.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@PreAuthorize("hasRole('CITIZEN')")
public class AppointmentController {

    private final AppointmentService service;
    private final UsersService usersService;

    @Autowired
    public AppointmentController(AppointmentService service, UsersService usersService) {
        this.service = service;
        this.usersService = usersService;
    }

    // POST /api/appointments
    @PostMapping
    public ResponseEntity<ApiResponse<Integer>> book(
            @Valid @RequestBody AppointmentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        // Lookup logged-in user from JWT
        Users currentUser = usersService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        // Pass userId to service
        Integer queueNumber = service.book(currentUser.getUserId(), request);

        // Return as JSON with queue number
        ApiResponse<Integer> response = new ApiResponse<>("Appointment booked successfully", queueNumber);
        return ResponseEntity.ok(response);
    }

    // GET /api/appointments/my?status=BOOKED&page=0&size=10
    @GetMapping("/my")
    public ResponseEntity<Page<AppointmentSummaryDto>> myAppointments(
            @RequestParam(value = "status", required = false) AppointmentStatus status,
            Pageable pageable,
            Authentication auth) {

        Integer userId = CustomUserDetails.requireUserId(auth);
        Page<AppointmentSummaryDto> page = (status == null)
                ? service.listMyAppointments(userId, pageable)
                : service.listMyAppointmentsByStatus(userId, status, pageable);

        return ResponseEntity.ok(page);
    }

    // PUT /api/appointments/{id}/cancel
    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancel(
            @PathVariable Integer id,
            @RequestBody(required = false) CancelRequest req,
            Authentication auth) {

        Integer userId = CustomUserDetails.requireUserId(auth);
        service.cancelMyAppointment(userId, id, req == null ? new CancelRequest(null) : req);

        return ResponseEntity.ok(new ApiResponse<>("Appointment cancelled successfully", null));
    }

    // PUT /api/appointments/{id}/reschedule
    @PutMapping("/{id}/reschedule")
    public ResponseEntity<AppointmentSummaryDto> reschedule(
            @PathVariable Integer id,
            @Valid @RequestBody RescheduleRequest req,
            Authentication auth) {

        Integer userId = CustomUserDetails.requireUserId(auth);
        AppointmentSummaryDto dto = service.rescheduleMyAppointment(userId, id, req);

        return ResponseEntity.ok(dto);
    }
}
