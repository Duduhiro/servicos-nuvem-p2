package com.duduhiro.servicos_nuvem_p2_back.DTOs;

public class AuthResponse {
    public String token;
    public String message;

    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }
}
