package com.erp.erpbackend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    private static final String SECRET_KEY =
            "erp_project_super_secret_key_for_jwt_authentication_2026_secure";

    public static String generateToken(
            String email
    ) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 10
                        )
                )

                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET_KEY.getBytes()
                )

                .compact();
    }
}