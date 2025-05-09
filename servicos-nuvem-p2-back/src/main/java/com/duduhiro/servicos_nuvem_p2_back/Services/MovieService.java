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
                    update.setBackdropUrl(m.getBackdropUrl());
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
        return tmdbService.fetchPopularMovies().stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .limit(5)
                .collect(Collectors.toList());
    }

    public List<Movie> getTrendingMovies() {
        return tmdbService.fetchTrendingMovies().stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .limit(4)
                .collect(Collectors.toList());
    }

    public List<Movie> getAtemporalMovies(User user) {
        List<Movie> topRatedMovies = tmdbService.fetchTopRatedMovies().stream()
                .map(movieRepo::saveOrUpdateByTmdbId)
                .collect(Collectors.toList());

        if (user == null) {
            return topRatedMovies.stream().limit(20).collect(Collectors.toList());
        }

        List<Long> watchedIds = userMovieRepo.findMovieIdsByUserId(user.getId());
        return topRatedMovies.stream()
                .filter(movie -> !watchedIds.contains(movie.getId()))
                .limit(20)
                .collect(Collectors.toList());
    }
}
