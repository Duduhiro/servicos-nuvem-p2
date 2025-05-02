package com.duduhiro.servicos_nuvem_p2_back.Services;

import com.duduhiro.servicos_nuvem_p2_back.DTOs.LoginRequest;
import com.duduhiro.servicos_nuvem_p2_back.DTOs.RegisterRequest;
import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import com.duduhiro.servicos_nuvem_p2_back.Entities.UserMovie;
import com.duduhiro.servicos_nuvem_p2_back.Jwt.JwtUtil;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserMovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final UserMovieRepository userMovieRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepo, UserMovieRepository userMovieRepo,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.userMovieRepo = userMovieRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void register(RegisterRequest req) {

        User user = new User(req.username, req.email, passwordEncoder.encode(req.password));
        userRepo.save(user);
    }

    public String login(LoginRequest req) {
        User user = userRepo.findByEmail(req.email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!passwordEncoder.matches(req.password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return jwtUtil.generateToken(user);
    }

    public List<UserMovie> getWatchlist(Long userId) {
        return userMovieRepo.findByUserId(userId);
    }

}