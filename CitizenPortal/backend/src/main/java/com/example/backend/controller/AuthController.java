package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.LogInRequestDto;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> citizenLogin(@RequestBody LogInRequestDto loginUserDto) {
        return authenticationService.loginWithRole(loginUserDto, "Citizen");
    }

    @PostMapping("/admin/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> adminLogin(@RequestBody LogInRequestDto loginUserDto) {
        return authenticationService.loginWithRole(loginUserDto, "Admin");
    }

    @PostMapping("/officer/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> officerLogin(@RequestBody LogInRequestDto loginUserDto) {
        return authenticationService.loginWithRole(loginUserDto, "Gov Officer");
    }
}
