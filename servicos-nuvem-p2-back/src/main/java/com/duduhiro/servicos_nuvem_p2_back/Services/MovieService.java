package com.duduhiro.servicos_nuvem_p2_back.Services;

import com.duduhiro.servicos_nuvem_p2_back.DTOs.MovieDTO;
import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import com.duduhiro.servicos_nuvem_p2_back.Repos.MovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserMovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final UserMovieRepository userMovieRepo;
    private final MovieRepository movieRepo;
    private final TmdbService tmdbService;

    public MovieService(MovieRepository movieRepo, TmdbService tmdbService, UserMovieRepository userMovieRepo) {
        this.movieRepo = movieRepo;
        this.tmdbService = tmdbService;
        this.userMovieRepo = userMovieRepo;
    }

    public List<MovieDTO> searchMovies(String title, Long userId) {
        List<Movie> movies = tmdbService.searchMoviesFromApi(title).stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .collect(Collectors.toList());

        return mapWithWatchlistStatus(movies, userId);
    }

    public List<MovieDTO> getPopularMovies(Long userId) {
        List<Movie> movies = tmdbService.fetchPopularMovies().stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .limit(5)
                .collect(Collectors.toList());
        return mapWithWatchlistStatus(movies, userId);
    }

    public List<MovieDTO> getTrendingMovies(Long userId) {
        List<Movie> movies = tmdbService.fetchTrendingMovies().stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .limit(4)
                .collect(Collectors.toList());
        return mapWithWatchlistStatus(movies, userId);
    }

    public List<MovieDTO> getAtemporalMovies(Long userId) {
        // Fetch top-rated movies from TMDb and save them in the database
        List<Movie> topRatedMovies = tmdbService.fetchTopRatedMovies().stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .limit(20)
                .collect(Collectors.toList());

        // If no user is provided, return the top-rated as they are
        if (userId == null) {
            return mapWithWatchlistStatus(topRatedMovies, null).stream()
                    .limit(20)
                    .collect(Collectors.toList());
        }

        // Get all movies already in the user's watchlist (from DB)
        List<Long> watchedIds = userMovieRepo.findMovieIdsByUserId(userId);

        // Filter out the movies that the user has already watched
        List<Movie> unwatchedMovies = topRatedMovies.stream()
                .filter(movie -> !watchedIds.contains(movie.getId()))
                .collect(Collectors.toList());

        // Map the final list with the inWatchlist flag
        return mapWithWatchlistStatus(unwatchedMovies, userId).stream()
                .limit(4)
                .collect(Collectors.toList());
    }

    private List<MovieDTO> mapWithWatchlistStatus(List<Movie> movies, Long userId) {
        if (userId == null) {
            return movies.stream().map(movie -> new MovieDTO(movie, false)).collect(Collectors.toList());
        }

        List<Long> userMovieIds = userMovieRepo.findMovieIdsByUserId(userId);

        return movies.stream().map(movie -> {
            boolean inWatchlist = userMovieIds.contains(movie.getId());
            return new MovieDTO(movie, inWatchlist);
        }).collect(Collectors.toList());
    }

}
