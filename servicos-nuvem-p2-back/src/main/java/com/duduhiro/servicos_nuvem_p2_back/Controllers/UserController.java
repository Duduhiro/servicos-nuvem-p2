package com.duduhiro.servicos_nuvem_p2_back.Controllers;

import com.duduhiro.servicos_nuvem_p2_back.DTOs.AuthResponse;
import com.duduhiro.servicos_nuvem_p2_back.DTOs.LoginRequest;
import com.duduhiro.servicos_nuvem_p2_back.DTOs.RegisterRequest;
import com.duduhiro.servicos_nuvem_p2_back.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = userService.login(request);
        return ResponseEntity.ok(new AuthResponse(token, "Login successful"));
    }

    @GetMapping("/{userId}/watchlist")
    public ResponseEntity<?> getUserWatchList(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getWatchlist(userId));
    }

}
