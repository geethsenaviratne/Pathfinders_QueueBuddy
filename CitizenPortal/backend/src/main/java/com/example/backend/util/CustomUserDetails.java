package com.example.backend.util;

import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    private final String username;
    private final String password;
    // Getter for role - needed for JWT generation and extraction
    @Getter
    private final String role;
    // Getter for userId - needed for user identification
    @Getter
    private final Integer userId;

    public CustomUserDetails(Integer userId, String username, String password, String role) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Utility method to extract userId from Authentication
    public static Integer requireUserId(Authentication auth) {
        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails p)) {
            throw new IllegalStateException("Unauthenticated");
        }
        return p.getUserId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Add ROLE_ prefix for Spring Security conventions
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase().replace(" ", "_")));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}