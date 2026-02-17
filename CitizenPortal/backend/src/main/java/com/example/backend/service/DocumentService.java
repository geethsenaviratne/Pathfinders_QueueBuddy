package com.example.backend.service;

import com.example.backend.dto.UploadResponse;
import com.example.backend.entity.SubmittedDocument;
import com.example.backend.repository.SubmittedDocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.Set;

@Service
public class DocumentService {
    private static final long MAX_PDF_BYTES = 5L * 1024 * 1024;
    private static final long MAX_IMG_BYTES = 3L * 1024 * 1024;
    private static final Set<String> ALLOWED = Set.of("application/pdf", "image/jpeg", "image/png");

    private final SubmittedDocumentRepository repo;

    public DocumentService(SubmittedDocumentRepository repo) { this.repo = repo; }

    public UploadResponse upload(Integer userId, Integer deptId, MultipartFile file) throws IOException {
        validate(file);
        SubmittedDocument doc = new SubmittedDocument();
        doc.setDepartmentId(deptId);
        doc.setUserId(userId);
        doc.setDocumentPdf(file.getBytes());
        doc.setSubmittedDate(Instant.now());
        SubmittedDocument saved = repo.save(doc);
        return new UploadResponse(saved.getSubmittedId());
    }

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("File is required.");
        String ctype = file.getContentType();
        if (ctype == null || !ALLOWED.contains(ctype))
            throw new IllegalArgumentException("Only PDF, JPG, or PNG allowed.");
        long size = file.getSize();
        if ("application/pdf".equals(ctype) && size > MAX_PDF_BYTES)
            throw new IllegalArgumentException("PDF exceeds 5MB.");
        if ((ctype.startsWith("image/")) && size > MAX_IMG_BYTES)
            throw new IllegalArgumentException("Image exceeds 3MB.");
    }

    public SubmittedDocument getForDownload(Integer submittedId, Integer userId) {
        SubmittedDocument doc = repo.findById(submittedId)
                .orElseThrow(() -> new IllegalArgumentException("Document not found."));
        if (!doc.getUserId().equals(userId))
            throw new SecurityException("Not your document.");
        return doc;
    }
}
