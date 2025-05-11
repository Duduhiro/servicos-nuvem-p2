package com.duduhiro.servicos_nuvem_p2_back.Controllers;

import com.duduhiro.servicos_nuvem_p2_back.DTOs.AuthResponse;
import com.duduhiro.servicos_nuvem_p2_back.DTOs.LoginRequest;
import com.duduhiro.servicos_nuvem_p2_back.DTOs.RegisterRequest;
import com.duduhiro.servicos_nuvem_p2_back.DTOs.UserDTO;
import com.duduhiro.servicos_nuvem_p2_back.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO request) {
        String token = userService.register(request);
        return ResponseEntity.ok(Map.of("Token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String, Object> loginData = userService.login(request);
        return ResponseEntity.ok(loginData);
    }

}
