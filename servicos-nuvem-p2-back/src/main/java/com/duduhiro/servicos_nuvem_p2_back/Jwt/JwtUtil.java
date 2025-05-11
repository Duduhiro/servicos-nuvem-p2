package com.duduhiro.servicos_nuvem_p2_back.Jwt;

import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expirationMs = 8600000;

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(String.valueOf(user.getEmail()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    public String extractedUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validationToken(String token, String email) {
        try {
            return extractedUsername(token).equals(email);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
