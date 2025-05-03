package com.duduhiro.servicos_nuvem_p2_back.Services;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.duduhiro.servicos_nuvem_p2_back.Entities.User;
import com.duduhiro.servicos_nuvem_p2_back.Repos.MovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserMovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public List<Movie> searchAndSync(String title) {

        List<Movie> existing = movieRepo.findByTitleContainingIgnoreCase(title);

        boolean needsUpdate = existing.isEmpty() ||
                existing.stream().anyMatch(m -> m.getLastFetchedAt().isBefore(LocalDateTime.now().minusHours(1)));

        if (needsUpdate) {

            List<Movie> fresh = tmdbService.searchMoviesFromApi(title);

            for (Movie m : fresh) {
                Optional<Movie> existingMovie = movieRepo.findByTmdbId(m.getTmdbId());
                if(existingMovie.isPresent()) {
                    Movie update = existingMovie.get();
                    update.setTitle(m.getTitle());
                    update.setRating(m.getRating());
                    update.setDescription(m.getDescription());
                    update.setPosterUrl(m.getPosterUrl());
                    update.setReleaseDate(m.getReleaseDate());
                    update.setLastFetchedAt(LocalDateTime.now());
                    movieRepo.save(update);
                } else {
                    m.setLastFetchedAt(LocalDateTime.now());
                    movieRepo.save(m);
                }
            }
            return movieRepo.findByTitleContainingIgnoreCase(title);
        }
        return existing;
    }

    public List<Movie> getPopularMovies() {
        List<Movie> fetched = tmdbService.fetchPopularMovies();
        for (Movie movie : fetched) {
            movieRepo.saveOrUpdateByTmdbId(movie);
        }
        return fetched.stream().limit(3).toList();
    }

    public List<Movie> getTrendingMovies() {
        List<Movie> fetched = tmdbService.fetchTrendingMovies();
        for (Movie movie : fetched) {
            movieRepo.saveOrUpdateByTmdbId(movie);
        }
        return fetched.stream().limit(4).toList();
    }

    public List<Movie> getAtemporalMovies(User user) {

        if (user == null) {
            return movieRepo.findTop4ByRatingGreaterThanOrderByRatingDesc(8.0);
        }

        List<Long> watchedMoviesId = userMovieRepo.findMovieIdsByUserId(user.getId());
        return movieRepo.findTop4ByRatingGreaterThanAndIdNotInOrderByRatingDesc(8.0, watchedMoviesId);
    }
}
