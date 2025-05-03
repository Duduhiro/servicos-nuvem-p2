package com.duduhiro.servicos_nuvem_p2_back.Controllers;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import com.duduhiro.servicos_nuvem_p2_back.Services.MovieService;
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
    private final UserRepository userRepository;

    public MovieController(MovieService movieService, UserRepository userRepository) {
        this.movieService = movieService;
        this.userRepository = userRepository;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String title) {
        List<Movie> results = movieService.searchAndSync(title);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Movie>> getPopularMovies() {
        return ResponseEntity.ok(movieService.getPopularMovies());
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Movie>> getTrendingMovies() {
        return ResponseEntity.ok(movieService.getTrendingMovies());
    }

    @GetMapping("/atemporal")
    public ResponseEntity<List<Movie>> getAtemporalMovies(@RequestParam(required = false) Long userId) {
        User user = (userId != null) ? userRepository.findById(userId).orElse(null) : null;
        return ResponseEntity.ok(movieService.getAtemporalMovies(user));
    }
}
