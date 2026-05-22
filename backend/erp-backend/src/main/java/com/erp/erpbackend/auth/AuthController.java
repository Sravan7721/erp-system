package com.erp.erpbackend.auth;

import com.erp.erpbackend.entity.User;

import com.erp.erpbackend.security.JwtUtil;

import com.erp.erpbackend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired

    private UserRepository userRepository;

    // REGISTER

    @PostMapping("/register")

    public String registerUser(
            @RequestBody User user
    ) {

        User existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if (existingUser != null) {

            return "Email already exists";
        }

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // LOGIN

    @PostMapping("/login")

    public String loginUser(
            @RequestBody User loginData
    ) {

        User user =
                userRepository.findByEmail(
                        loginData.getEmail()
                );

        if (user == null) {

            return "User Not Found";
        }

        if (!user.getPassword().equals(
                loginData.getPassword()
        )) {

            return "Invalid Password";
        }

        // GENERATE JWT TOKEN

        return JwtUtil.generateToken(
                user.getEmail()
        );
    }
}