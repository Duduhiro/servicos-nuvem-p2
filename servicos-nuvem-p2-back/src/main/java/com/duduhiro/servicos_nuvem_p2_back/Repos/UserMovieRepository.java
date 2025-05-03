package com.duduhiro.servicos_nuvem_p2_back.Repos;

import com.duduhiro.servicos_nuvem_p2_back.Entities.UserMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserMovieRepository extends JpaRepository<UserMovie, Long> {

    List<UserMovie> findByUserId(Long userId);

    @Query("SELECT um.movie.id FROM UserMovie um WHERE um.user.id = :userId")
    List<Long> findMovieIdsByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT um FROM UserMovie um
        WHERE um.user.id = :userId
        AND (:watched IS NULL OR um.watched = :watched)
        AND (:title IS NULL OR LOWER(um.movie.title) LIKE LOWER(CONCAT('%', :title, '%')))
        AND (:minRating IS NULL OR um.movie.rating >= :minRating)
    """)
    List<UserMovie> findByFilters(@Param("userId") Long userId,
                                  @Param("title") String title,
                                  @Param("watched") Boolean watched,
                                  @Param("minRating") Double minRating);

}
