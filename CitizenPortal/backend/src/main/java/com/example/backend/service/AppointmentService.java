package com.example.backend.service;

import com.example.backend.dto.AppointmentRequest;
import com.example.backend.entity.*;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.DepartmentRepository;
import com.example.backend.repository.SubmittedDocumentRepository;
import org.springframework.stereotype.Service;

import com.example.backend.dto.AppointmentSummaryDto;
import com.example.backend.dto.CancelRequest;
import com.example.backend.dto.RescheduleRequest;
import com.example.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.EnumSet;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepo;
    private final SubmittedDocumentRepository submittedRepo;
    private final UsersRepository usersRepo;
    private final EmailService emailService;
    private final DepartmentRepository departmentRepo;

    @Value("${app.appointments.cancel-cutoff-hours:12}")
    private long cancelCutoffHours;

    @Value("${app.appointments.reschedule-cutoff-hours:24}")
    private long rescheduleCutoffHours;


    public AppointmentService(AppointmentRepository appointmentRepo, SubmittedDocumentRepository submittedRepo, UsersRepository usersRepo, EmailService emailService, DepartmentRepository departmentRepo) {
        this.appointmentRepo = appointmentRepo; this.submittedRepo = submittedRepo; this.usersRepo = usersRepo;this.emailService = emailService; this.departmentRepo = departmentRepo;
    }

    public Integer book(Integer userId, AppointmentRequest req) {
        // Ensure submitted doc exists & belongs to user & department matches
//        SubmittedDocument doc = submittedRepo.findById(req.submittedId())
//                .orElseThrow(() -> new IllegalArgumentException("Submitted document not found."));
//        if (!doc.getUserId().equals(userId))
//            throw new SecurityException("Submitted document does not belong to current user.");
//        if (!doc.getDepartmentId().equals(req.departmentId()))
//            throw new IllegalArgumentException("Submitted document is for a different department.");

        Integer maxQueue = appointmentRepo.maxQueuePlaceByDepartmentAndDate(
                req.departmentId(),
                req.appointmentDate()
        );
        int queuePlace = (maxQueue == null ? 0 : maxQueue) + 1;


        Appointment a = new Appointment();
        a.setDepartmentId(req.departmentId());
        a.setUserId(userId);
        a.setAppointmentDate(req.appointmentDate());
        a.setAppointmentTime(req.appointmentTime());
        a.setBookedDate(Instant.now());
        a.setQueuePlace(queuePlace);

        appointmentRepo.save(a);

        return queuePlace;
    }

    public Page<AppointmentSummaryDto> listMyAppointments(Integer userId, Pageable pageable) {
        return appointmentRepo.findByUserIdOrderByAppointmentDateAscAppointmentTimeAsc(userId, pageable)
                .map(this::toSummary);
    }

    public Page<AppointmentSummaryDto> listMyAppointmentsByStatus(Integer userId, AppointmentStatus status, Pageable pageable) {
        return appointmentRepo.findByUserIdAndStatusOrderByAppointmentDateAscAppointmentTimeAsc(userId, status, pageable)
                .map(this::toSummary);
    }

    @Transactional
    public void cancelMyAppointment(Integer userId, Integer appointmentId, CancelRequest req) {
        Appointment appt = appointmentRepo.findByAppointmentIdAndUserId(appointmentId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        ensureCancelable(appt);

        appt.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepo.save(appt);

        notify(appt, /*subject*/"Appointment Cancelled",
                "Your appointment has been cancelled. Ref: " + appt.getAppointmentId());
    }

    @Transactional
    public AppointmentSummaryDto rescheduleMyAppointment(Integer userId, Integer appointmentId, RescheduleRequest req) {
        Appointment appt = appointmentRepo.findByAppointmentIdAndUserId(appointmentId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        ensureReschedulable(appt);

        // Department cannot change (per requirement)
        Integer deptId = appt.getDepartmentId();

        // slot must be free (no active booked appointment in same slot for that department)
        boolean slotTaken = appointmentRepo.existsByDepartmentIdAndAppointmentDateAndAppointmentTimeAndStatusIn(
                deptId,
                req.newDate(),
                req.newTime(),
                EnumSet.of(AppointmentStatus.BOOKED, AppointmentStatus.COMPLETED, AppointmentStatus.NO_SHOW) // treat non-cancelled as occupied
        );
        if (slotTaken) {
            throw new IllegalStateException("Requested time slot is unavailable");
        }

        appt.setAppointmentDate(req.newDate());
        appt.setAppointmentTime(req.newTime());
        appt.setStatus(AppointmentStatus.BOOKED);
        // optional: recompute queuePlace if you maintain per-day queues
        appointmentRepo.save(appt);

        notify(appt, "Appointment Rescheduled",
                "Your appointment has been rescheduled to %s %s. Ref: %d"
                        .formatted(req.newDate(), req.newTime(), appt.getAppointmentId()));

        return toSummary(appt);
    }

    private void ensureCancelable(Appointment appt) {
        if (appt.getStatus() != AppointmentStatus.BOOKED) {
            throw new IllegalStateException("Only BOOKED appointments can be cancelled");
        }
        if (isWithinCutoff(appt.getAppointmentDate(), appt.getAppointmentTime(), cancelCutoffHours)) {
            throw new IllegalStateException("Cancellation window closed");
        }
    }

    private void ensureReschedulable(Appointment appt) {
        if (appt.getStatus() != AppointmentStatus.BOOKED) {
            throw new IllegalStateException("Only BOOKED appointments can be rescheduled");
        }
        if (isWithinCutoff(appt.getAppointmentDate(), appt.getAppointmentTime(), rescheduleCutoffHours)) {
            throw new IllegalStateException("Reschedule window closed");
        }
    }

    private boolean isWithinCutoff(LocalDate date, LocalTime time, long cutoffHours) {
        ZonedDateTime slot = ZonedDateTime.of(date, time, ZoneId.systemDefault());
        ZonedDateTime now = ZonedDateTime.now(ZoneId.systemDefault());
        Duration diff = Duration.between(now, slot);
        return !diff.isNegative() && diff.toHours() < cutoffHours;
    }

    private AppointmentSummaryDto toSummary(Appointment a) {
        String deptName = departmentRepo.findById(a.getDepartmentId())
                .map(Department::getDepartment_name)
                .orElse("Unknown Department");

        return new AppointmentSummaryDto(
                a.getAppointmentId(),
                deptName,
                a.getAppointmentDate(),
                a.getAppointmentTime(),
                a.getStatus()
        );
    }

    private void notify(Appointment appt, String subject, String text) {
        Integer userId = appt.getUserId();
        Users user = usersRepo.findById(appt.getUserId())
                .orElse(null);
        if (user != null && user.getEmail() != null) {
            emailService.sendEmail(user.getEmail(), subject, text);
        }
        // You can also broadcast to officers/admins of this department if required.
    }

}
