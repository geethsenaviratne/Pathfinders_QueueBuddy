package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.Users;
import com.example.backend.service.UsersService;
import com.example.backend.util.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    private final UsersService usersService;

    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/users")
    public ResponseEntity<ApiResponse<UserDto>> createUser(@RequestBody Users user) {
        return usersService.addNewUsers(user);
    }

    // Get current authenticated citizen
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // Check role using the getRole() method instead of authorities
        String role = userDetails.getRole();
        if (!"Citizen".equals(role)) {
            throw new RuntimeException("This endpoint is only available for Citizens");
        }

        // Fetch citizen from users table
        Users currentUser = usersService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        UserDto mappedUser = usersService.mapToDto(currentUser);

        return ResponseEntity.ok(new ApiResponse<>("Authenticated user", mappedUser));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserDto>>> allUsers() {
        List<UserDto> users = usersService.getAllUsers();

        return ResponseEntity.ok(new ApiResponse<>("All users", users));
    }
}