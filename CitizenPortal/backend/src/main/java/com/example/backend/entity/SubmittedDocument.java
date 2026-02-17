package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.time.Instant;

@Getter @Setter
@Entity @Table(name = "submitted_documents")
public class SubmittedDocument {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submitted_id")
    private Integer submittedId;

    @Column(name = "department_id")
    private Integer departmentId;

    @Column(name = "user_id")
    private Integer userId;

    @Lob
    @Column(name = "document_pdf", columnDefinition = "LONGBLOB")
    private byte[] documentPdf;

    @Column(name = "submitted_date")
    private Instant submittedDate;
}