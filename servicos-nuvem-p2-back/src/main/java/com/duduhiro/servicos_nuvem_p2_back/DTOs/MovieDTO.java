package com.duduhiro.servicos_nuvem_p2_back.DTOs;

import com.duduhiro.servicos_nuvem_p2_back.Entities.Movie;

public class MovieDTO {
    private Long id;
    private String title;
    private String description;
    private String posterUrl;
    private String backdropUrl;
    private Double rating;
    private boolean inWatchlist;

    public MovieDTO(Movie movie, boolean inWatchlist) {
        this.id = movie.getId();
        this.title = movie.getTitle();
        this.description = movie.getDescription();
        this.posterUrl = movie.getPosterUrl();
        this.backdropUrl = movie.getBackdropUrl();
        this.rating = movie.getRating();
        this.inWatchlist = inWatchlist;
    }

    // Getters and Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getBackdropUrl() {
        return backdropUrl;
    }

    public void setBackdropUrl(String backdropUrl) {
        this.backdropUrl = backdropUrl;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public boolean isInWatchlist() {
        return inWatchlist;
    }

    public void setInWatchlist(boolean inWatchlist) {
        this.inWatchlist = inWatchlist;
    }
}
