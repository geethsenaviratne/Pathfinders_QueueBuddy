package com.example.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {

    @GetMapping("/debug")
    public String debug(Authentication auth) {
        return "User: " + auth.getName() + " | Roles: " + auth.getAuthorities();
    }
}