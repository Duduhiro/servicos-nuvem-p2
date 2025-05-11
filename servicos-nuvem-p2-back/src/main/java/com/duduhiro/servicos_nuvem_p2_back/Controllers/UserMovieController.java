package com.duduhiro.servicos_nuvem_p2_back.Controllers;

import com.duduhiro.servicos_nuvem_p2_back.DTOs.AddToWatchlistRequest;
import com.duduhiro.servicos_nuvem_p2_back.Services.UserMovieService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class UserMovieController {

    private final UserMovieService userMovieService;

    public UserMovieController(UserMovieService userMovieService) {
        this.userMovieService = userMovieService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToWatchlist(@RequestBody AddToWatchlistRequest request) {
        userMovieService.addToWatchlist(request);
        return ResponseEntity.ok("Movie added to watchlist");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserWatchlist(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(userMovieService.getFilteredWatchlist(userId));
    }

    @DeleteMapping("/remove/{userId}/{movieId}")
    public ResponseEntity<?> removeFromWatchlist(@PathVariable Long userId, @PathVariable Long movieId) {
        userMovieService.removeFromWatchlist(userId, movieId);
        return ResponseEntity.noContent().build();
    }

}
