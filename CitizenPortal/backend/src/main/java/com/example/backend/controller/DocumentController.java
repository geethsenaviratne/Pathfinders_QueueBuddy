package com.example.backend.controller;

import com.example.backend.dto.UploadResponse;
import com.example.backend.entity.SubmittedDocument;
import com.example.backend.entity.Users;
import com.example.backend.service.DocumentService;
import com.example.backend.service.UsersService;
import com.example.backend.util.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/submissions")
@PreAuthorize("hasRole('CITIZEN')")
public class DocumentController {
    private final DocumentService service;
    private final UsersService usersService;

    @Autowired
    public DocumentController(DocumentService service, UsersService usersService) {
        this.service = service;
        this.usersService = usersService;
    }

    @PostMapping
    public UploadResponse upload(@RequestParam("departmentId") Integer departmentId,
                                 @RequestParam("file") MultipartFile file,
                                 Authentication auth) throws IOException {
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        Users currentUser = usersService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));
        Integer userId = currentUser.getUserId();
        return service.upload(userId, departmentId, file);
    }

    @GetMapping("/{submittedId}/download")
    public void download(@PathVariable Integer submittedId,
                         @AuthenticationPrincipal CustomUserDetails userDetails,
                         HttpServletResponse response) throws IOException {

        // Lookup Users entity by email
        Users currentUser = usersService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        // Fetch document using userId
        SubmittedDocument doc = service.getForDownload(submittedId, currentUser.getUserId());

        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"document\"");
        response.setContentType("application/octet-stream");
        response.getOutputStream().write(doc.getDocumentPdf());
        response.flushBuffer();
    }
}