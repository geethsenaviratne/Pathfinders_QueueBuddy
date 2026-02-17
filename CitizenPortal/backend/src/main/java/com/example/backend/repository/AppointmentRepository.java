package com.example.backend.repository;

import com.example.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.backend.entity.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("""
     SELECT COALESCE(MAX(a.queuePlace), 0)
     FROM Appointment a
     WHERE a.departmentId = :deptId
       AND a.appointmentDate = :date
       AND a.appointmentTime = :time
  """)
    Integer maxQueuePlace(Integer deptId, java.time.LocalDate date, java.time.LocalTime time);

    Page<Appointment> findByUserIdOrderByAppointmentDateAscAppointmentTimeAsc(Integer userId, Pageable pageable);

    Page<Appointment> findByUserIdAndStatusOrderByAppointmentDateAscAppointmentTimeAsc(
            Integer userId, AppointmentStatus status, Pageable pageable);

    Optional<Appointment> findByAppointmentIdAndUserId(Integer appointmentId, Integer userId);

    boolean existsByDepartmentIdAndAppointmentDateAndAppointmentTimeAndStatusIn(
            Integer departmentId, LocalDate date, LocalTime time,
            java.util.Collection<AppointmentStatus> statuses);

    @Query("SELECT MAX(a.queuePlace) FROM Appointment a WHERE a.departmentId = :departmentId AND a.appointmentDate = :date")
    Integer maxQueuePlaceByDepartmentAndDate(@Param("departmentId") Integer departmentId,
                                             @Param("date") LocalDate date);


}
