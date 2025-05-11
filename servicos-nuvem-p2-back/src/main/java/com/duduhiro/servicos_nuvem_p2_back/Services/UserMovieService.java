package com.duduhiro.servicos_nuvem_p2_back.Services;


import com.duduhiro.servicos_nuvem_p2_back.DTOs.AddToWatchlistRequest;
import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import com.duduhiro.servicos_nuvem_p2_back.Entities.UserMovie;
import com.duduhiro.servicos_nuvem_p2_back.Repos.MovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserMovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserMovieService {

    private final UserMovieRepository repo;
    private final UserRepository userRepo;
    private final MovieRepository movieRepo;

    public UserMovieService(UserMovieRepository repo, UserRepository userRepo, MovieRepository movieRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.movieRepo = movieRepo;
    }

    public void addToWatchlist(AddToWatchlistRequest req) {

        User user = userRepo.findById(req.userId).orElseThrow();
        Movie movie = movieRepo.findById(req.movieId).orElseThrow();

        UserMovie um = new UserMovie(user, movie, req.userRating, (req.watched != null && req.watched));
        repo.save(um);
    }

    @Transactional
    public void removeFromWatchlist(Long userId, Long movieId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepo.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));

        repo.deleteByUserAndMovie(user, movie);
    }

    public List<Movie> getFilteredWatchlist(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        List<Long> movieIds = repo.findMovieIdsByUserId(user.getId());

        return movieRepo.findAllById(movieIds);
    }

}
