package com.example.backend.repository;

import com.example.backend.entity.GovernmentOfficer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GovernmentOfficerRepository extends JpaRepository<GovernmentOfficer,Integer> {

    Optional<GovernmentOfficer> findByEmail(String username);
}
