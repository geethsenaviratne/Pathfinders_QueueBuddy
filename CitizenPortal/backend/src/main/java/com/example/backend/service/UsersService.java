package com.example.backend.service;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.UserType;
import com.example.backend.entity.Users;
import com.example.backend.repository.UserTypeRepository;
import com.example.backend.repository.UsersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class UsersService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserTypeRepository userTypeRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder, EmailService emailService, UserTypeRepository userTypeRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.userTypeRepository = userTypeRepository;
    }

    public UserDto mapToDto(Users user) {
        return new UserDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getDateCreated()
        );
    }

    public ResponseEntity<ApiResponse<UserDto>> addNewUsers(Users users) {
        Optional<Users> optionalUsers = usersRepository.findByEmail(users.getEmail());
        if (optionalUsers.isPresent()) {
            return ResponseEntity.ok(
                    new ApiResponse<>("You Already SignedUp.Please Login.", mapToDto(optionalUsers.get()))
            );
        }
        users.setDateCreated(new Date(System.currentTimeMillis()));

        UserType citizenType = userTypeRepository.findById(1).orElseThrow(() -> new RuntimeException("UserType not found"));
        users.setUserTypeId(citizenType);

        users.setPassword(passwordEncoder.encode(users.getPassword()));
        Users savedUser = usersRepository.save(users);

        try {
            Map<String, Object> model = Map.of(
                    "name", savedUser.getFirstName(),
                    "message", "Thank You For Joining With US"
            );
            emailService.sendTemplateMail(
                    savedUser.getEmail(),
                    "Welcome to Our Platform!",
                    "emailTemplate",
                    model
            );
        } catch (Exception e) {
            log.error("Error sending welcome email to {}", savedUser.getEmail(), e);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Successfully Created Users.", mapToDto(savedUser)));
    }

    public List<UserDto> getAllUsers() {
        return usersRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // Fixed: Return Optional<Users> directly instead of wrapping in another Optional
    public Optional<Users> findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
}