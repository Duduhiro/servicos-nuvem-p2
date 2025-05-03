package com.duduhiro.servicos_nuvem_p2_back.Services;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.duduhiro.servicos_nuvem_p2_back.Repos.MovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserMovieRepository;
import com.duduhiro.servicos_nuvem_p2_back.Repos.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepo;
    private final TmdbService tmdbService;

    public MovieService(MovieRepository movieRepo, TmdbService tmdbService) {
        this.movieRepo = movieRepo;
        this.tmdbService = tmdbService;
    }

    public List<Movie> searchAndSync(String title) {

        List<Movie> existing = movieRepo.findByTitleContainingIgnoreCase(title);

        boolean needsUpdate = existing.isEmpty() ||
                existing.stream().anyMatch(m -> m.getLastFetchedAt().isBefore(LocalDateTime.now().minusMinutes(1)));

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

}
