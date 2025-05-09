package com.duduhiro.servicos_nuvem_p2_back.Repos;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findByTitleContainingIgnoreCase(String title);

    Optional<Movie> findByTmdbId(Long tmdbId);

    @Query("""
        SELECT m FROM Movie m
        WHERE m.rating > :minRating
        AND m.id NOT IN :watchedIds
        ORDER BY m.rating DESC
    """)
    List<Movie> findTop4ByRatingGreaterThanAndIdNotInOrderByRatingDesc(
            @Param("minRating") double minRating,
            @Param("watchedIds") List<Long> watchedIds
    );

    List<Movie> findTop4ByRatingGreaterThanOrderByRatingDesc(double minRating);

    default Movie saveOrUpdateByTmdbId(Movie movie) {
        return findByTmdbId(movie.getTmdbId())
                .map(existing -> {
                    existing.setTitle(movie.getTitle());
                    existing.setDescription(movie.getDescription());
                    existing.setPosterUrl(movie.getPosterUrl());
                    existing.setRating(movie.getRating());
                    existing.setReleaseDate(movie.getReleaseDate());
                    existing.setLastFetchedAt(LocalDateTime.now());
                    return save(existing);
                })
                .orElseGet(() -> save(movie));
    }
}
