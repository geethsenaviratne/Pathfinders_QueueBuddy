package com.example.backend.config;

import com.example.backend.repository.UsersRepository;
import com.example.backend.repository.AdminRepository;
import com.example.backend.repository.GovernmentOfficerRepository;
import com.example.backend.util.CustomUserDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ApplicationConfiguration {

    private final UsersRepository usersRepository;
    private final AdminRepository adminRepository;
    private final GovernmentOfficerRepository officerRepository;

    public ApplicationConfiguration(UsersRepository usersRepository,
                                    AdminRepository adminRepository,
                                    GovernmentOfficerRepository officerRepository) {
        this.usersRepository = usersRepository;
        this.adminRepository = adminRepository;
        this.officerRepository = officerRepository;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> {
            // Try UsersRepository for Citizen
            return usersRepository.findByEmail(username)
                    .map(user -> new CustomUserDetails(user.getId(), user.getEmail(), user.getPassword(), "Citizen"))
                    .orElseGet(() ->
                            // Try AdminRepository for Admin
                            adminRepository.findByEmail(username)
                                    .map(admin -> new CustomUserDetails(admin.getId(), admin.getEmail(), admin.getPassword(), "Admin"))
                                    .orElseGet(() ->
                                            // Try GovernmentOfficerRepository for Gov Officer
                                            officerRepository.findByEmail(username)
                                                    .map(officer -> new CustomUserDetails(officer.getId(), officer.getEmail(), officer.getPassword(), "Gov Officer"))
                                                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username))
                                    )
                    );
        };
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService,
                                                  BCryptPasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }
}