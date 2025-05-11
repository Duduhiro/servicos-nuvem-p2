package com.duduhiro.servicos_nuvem_p2_back.Controllers;

import com.duduhiro.servicos_nuvem_p2_back.DTOs.MovieDTO;
import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import com.duduhiro.servicos_nuvem_p2_back.Services.MovieService;
import org.apache.coyote.Request;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService, UserRepository userRepository) {
        this.movieService = movieService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<MovieDTO>> searchMovies(@RequestParam String title, @RequestParam(required = false) Long userId) {
        List<MovieDTO> results = movieService.searchMovies(title, userId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<MovieDTO>> getPopularMovies(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(movieService.getPopularMovies(userId));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<MovieDTO>> getTrendingMovies(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(movieService.getTrendingMovies(userId));
    }

    @GetMapping("/atemporal")
    public ResponseEntity<List<MovieDTO>> getAtemporalMovies(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(movieService.getAtemporalMovies(userId));
    }
}
