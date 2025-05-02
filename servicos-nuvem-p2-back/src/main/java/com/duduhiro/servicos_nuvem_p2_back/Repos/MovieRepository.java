package com.duduhiro.servicos_nuvem_p2_back.Repos;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
