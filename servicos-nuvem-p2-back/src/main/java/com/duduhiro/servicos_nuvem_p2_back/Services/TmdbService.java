package com.duduhiro.servicos_nuvem_p2_back.Services;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TmdbService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Movie> searchMoviesFromApi(String title) {
        String url = String.format("%s/search/movie?api_key=%s&query=%s", apiUrl, apiKey, UriUtils.encode(title, StandardCharsets.UTF_8));
        ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        if(response.getStatusCode().is2xxSuccessful()) {
            JsonNode results = response.getBody().get("results");
            List<Movie> movies = new ArrayList<>();

            for(JsonNode node : results) {
                Movie movie = new Movie();
                movie.setTmdbId(node.get("id").asLong());
                movie.setTitle(node.get("title").asText());
                movie.setDescription(node.get("overview").asText(""));
                movie.setPosterUrl("https://image.tmdb.org/t/p/w500" + node.get("poster_path").asText(""));
                movie.setRating(node.get("vote_average").asDouble());
                String release = node.get("release_date").asText();
                if (!release.isEmpty()) {
                    movie.setReleaseDate(LocalDate.parse(release, formatter));
                }
                movie.setCreatedAt(LocalDateTime.now());
                movie.setLastFetchedAt(LocalDateTime.now());
                movies.add(movie);
            }
            return movies;
        } else {
            throw new RuntimeException("Failed to fetch from TMDb");
        }
    }

    public Movie fetchMovieByTmdbId(Long tmdbId) {
        String url = String.format("%s/movie/%d?api_key=%s", apiUrl, tmdbId, apiKey);
        ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            JsonNode node = response.getBody();
            Movie movie = new Movie();
            movie.setTmdbId(node.get("id").asLong());
            movie.setTitle(node.get("title").asText());
            movie.setDescription(node.get("overview").asText(""));
            movie.setPosterUrl("https://image.tmdb.org/t/p/w500" + node.get("poster_path").asText(""));
            movie.setCreatedAt(LocalDateTime.now());
            movie.setLastFetchedAt(LocalDateTime.now());
            return movie;
        } else {
            throw new RuntimeException("Failed to fetch movie details from TMDb");
        }
    }

    private List<Movie> fetchMoviesFromTmdb(String url) {
        ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
        List<Movie> movies = new ArrayList<>();

        if (response.getStatusCode().is2xxSuccessful()) {
            JsonNode results = response.getBody().get("results");

            for (JsonNode node : results) {
                Movie movie = new Movie();
                movie.setTmdbId(node.get("id").asLong());
                movie.setTitle(node.get("title").asText(""));
                movie.setDescription(node.get("overview").asText(""));
                movie.setPosterUrl("https://image.tmdb.org/t/p/w500" + node.get("poster_path").asText(""));
                movie.setBackdropUrl("https://image.tmdb.org/t/p/w1280" + node.get("backdrop_path").asText(""));
                movie.setRating(node.get("vote_average").asDouble());

                String release = node.get("release_date").asText("");
                if (!release.isEmpty()) {
                    movie.setReleaseDate(LocalDate.parse(release));
                }

                movie.setCreatedAt(LocalDateTime.now());
                movie.setLastFetchedAt(LocalDateTime.now());
                movies.add(movie);
            }
        }
        return movies;
    }

    public List<Movie> fetchPopularMovies() {
        String url = String.format("%s/movie/popular?api_key=%s", apiUrl, apiKey);
        return fetchMoviesFromTmdb(url);
    }

    public List<Movie> fetchTrendingMovies() {
        String url = String.format("%s/trending/movie/week?api_key=%s", apiUrl, apiKey);
        return fetchMoviesFromTmdb(url);
    }

    public List<Movie> fetchTopRatedMovies() {
        String url = String.format("%s/movie/top_rated?api_key=%s&page=1", apiUrl, apiKey);
        return fetchMoviesFromTmdb(url).stream().limit(20).collect(Collectors.toList());
    }

}
