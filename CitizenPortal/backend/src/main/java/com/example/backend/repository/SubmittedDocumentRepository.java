package com.example.backend.repository;

import com.example.backend.entity.SubmittedDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubmittedDocumentRepository extends JpaRepository<SubmittedDocument, Integer> {
    Optional<SubmittedDocument> findTopByUserIdAndDepartmentIdOrderBySubmittedDateDesc(Integer userId, Integer deptId);
}
