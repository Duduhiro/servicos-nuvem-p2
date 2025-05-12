'use client'

import Header from "@/components/ui/header";
import MovieCard from "@/components/ui/movie-card";
import { useEffect, useState } from "react";
import { addUserList, getMovieByName, Movie, removeUserList } from "../services/get-movies";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";


export default function SearchPage() {
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const movieName = searchParams.get("name") || "";

    const UID = getCookie('user_id');
    const userId = UID ? parseInt(UID as string, 10) : 0;

    const loadMovies = async () => {

        if (movieName.trim() === "") {
            setMovies([]);
            return
        };

        try {
            const movies = await getMovieByName(movieName, userId);
            setMovies(movies);

        } catch (error) {
            console.error("Error fetching movies:", error);
        }   
    }

    useEffect(() => {
        loadMovies();

    }, [movieName]);

    const handleSearch = (name: string) => {
        router.push(`/search-movie?name=${encodeURIComponent(name)}`)
    }

    const toggleWatchlist = async (movies: Movie[], movieId: number) => {
        try {
            const isInList = movies.find((movie) => movie.id === movieId)?.inWatchlist;
        
            if (isInList) {
                await removeUserList(userId, movieId);
            } else {
                await addUserList(userId, movieId);
            }
            loadMovies()       
        } catch (error) {
            console.error("Error updating watchlist", error)
        }
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <main className="flex items-center justify-center">
                <div className="max-w-7xl w-full py-5">
                    {
                    movies.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {
                            movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    image={movie.posterUrl}
                                    rating={movie.rating}
                                    inWatchlist={movie.inWatchlist}
                                    onToggle={() => toggleWatchlist(movies, movie.id)}
                                />
                            ))
                            }
                        </div>
                    ) : (
                        <div className="w-full text-center text-2xl font-semibold text-muted-foreground mt-4">Movie not found</div>
                    )
                    }
                </div>
            </main>
        </div>
    )
}