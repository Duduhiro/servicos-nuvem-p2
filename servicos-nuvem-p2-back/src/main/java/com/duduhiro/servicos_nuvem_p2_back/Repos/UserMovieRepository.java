package com.duduhiro.servicos_nuvem_p2_back.Repos;

import com.duduhiro.servicos_nuvem_p2_back.Entities.UserMovie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMovieRepository extends JpaRepository<UserMovie, Long> {

    List<UserMovie> findByUserId(Long userId);

}
