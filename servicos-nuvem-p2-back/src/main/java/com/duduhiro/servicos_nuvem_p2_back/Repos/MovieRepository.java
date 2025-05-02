package com.duduhiro.servicos_nuvem_p2_back.Repos;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findByTitleContainingIgnoreCase(String title);

    Optional<Movie> findByTmdbId(Long tmdbId);

}
