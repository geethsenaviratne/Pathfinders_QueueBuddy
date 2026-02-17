package com.example.backend.service;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.LogInRequestDto;
import com.example.backend.entity.Users;
import com.example.backend.entity.Admin;
import com.example.backend.entity.GovernmentOfficer;
import com.example.backend.repository.GovernmentOfficerRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.repository.AdminRepository;
import com.example.backend.util.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsersRepository usersRepository;
    private final AdminRepository adminRepository;
    private final GovernmentOfficerRepository officerRepository;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager,
                                 JwtService jwtService,
                                 UsersRepository usersRepository,
                                 AdminRepository adminRepository,
                                 GovernmentOfficerRepository officerRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
        this.adminRepository = adminRepository;
        this.officerRepository = officerRepository;
    }

    public ResponseEntity<ApiResponse<Map<String, Object>>> loginWithRole(LogInRequestDto loginUserDto, String role) {
        switch (role) {
            case "Citizen":
                return loginInRepository(loginUserDto, usersRepository, role,
                        u -> ((Users) u).getEmail(), u -> ((Users) u).getPassword(), u -> ((Users) u).getId());
            case "Admin":
                return loginInRepository(loginUserDto, adminRepository, role,
                        u -> ((Admin) u).getEmail(), u -> ((Admin) u).getPassword(), u -> ((Admin) u).getId());
            case "Gov Officer":
                return loginInRepository(loginUserDto, officerRepository, role,
                        u -> ((GovernmentOfficer) u).getEmail(), u -> ((GovernmentOfficer) u).getPassword(), u -> ((GovernmentOfficer) u).getId());
            default:
                throw new RuntimeException("Invalid role");
        }
    }

    private <T> ResponseEntity<ApiResponse<Map<String, Object>>> loginInRepository(
            LogInRequestDto loginUserDto,
            JpaRepository<T, Integer> repository,
            String role,
            java.util.function.Function<T, String> usernameMapper,
            java.util.function.Function<T, String> passwordMapper,
            java.util.function.Function<T, Integer> idMapper
    ) {
        Optional<T> userEntityOptional;
        if (role.equals("Citizen")) {
            userEntityOptional = (Optional<T>) usersRepository.findByEmail(loginUserDto.getEmail());
        } else if (role.equals("Admin")) {
            userEntityOptional = (Optional<T>) adminRepository.findByEmail(loginUserDto.getEmail());
        } else if (role.equals("Gov Officer")) {
            userEntityOptional = (Optional<T>) officerRepository.findByEmail(loginUserDto.getEmail());
        } else {
            throw new RuntimeException("Unsupported role");
        }

        T userEntity = userEntityOptional
                .orElseThrow(() -> new RuntimeException(role + " not found"));

        String username = usernameMapper.apply(userEntity);
        String password = passwordMapper.apply(userEntity);
        Integer userId = idMapper.apply(userEntity);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, loginUserDto.getPassword()));

        CustomUserDetails userDetails = new CustomUserDetails(userId, username, password, role);
        String token = jwtService.generateToken(userDetails);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("token", token);
        responseData.put("expiresIn", jwtService.getExpirationTime());
        responseData.put("role", role);

        return ResponseEntity.ok(new ApiResponse<>("Login successful", responseData));
    }
}