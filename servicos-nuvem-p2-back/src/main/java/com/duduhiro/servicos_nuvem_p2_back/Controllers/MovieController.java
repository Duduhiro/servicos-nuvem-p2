package com.duduhiro.servicos_nuvem_p2_back.Controllers;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
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

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String title) {
        List<Movie> results = movieService.searchAndSync(title);
        return ResponseEntity.ok(results);
    }

}
