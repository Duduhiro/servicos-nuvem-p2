'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import MovieCard from "@/components/ui/movie-card";
import MovieFeatured from "@/components/ui/movie-featured";
import { addUserList, getAllTime, getPopular, getTrending, Movie, removeUserList } from "@/app/services/get-movies";
import { useEffect, useState } from "react";
import { MovieCardSkeleton, MovieFeaturedSkeleton } from "./skeleton";
import Header from "@/components/ui/header";

export default function Home() {

    const [popular, setPopular] = useState<Movie[]>([]);
    const [trending, setTrending] = useState<Movie[]>([]);
    const [allTime, setAllTime] = useState<Movie[]>([]);

    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number>(0);

    const loadMovies = async () => {
        setLoading(true);
        try {
            const popular = await getPopular(userId);
            setPopular(popular);

            const trending = await getTrending(userId);
            setTrending(trending);

            const allTime = await getAllTime(userId);
            setAllTime(allTime);

        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setUserId(1);
        loadMovies();
    }, []);

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
            <Header />
            <main className="flex items-center justify-center">
                <div className="max-w-7xl w-full py-5">
                    <h1 className="text-3xl font-bold mb-5">Featured Movies</h1>
                    <Carousel className="mb-4">
                        <CarouselContent>
                        {
                            loading ? (
                                <CarouselItem>
                                    <MovieFeaturedSkeleton />
                                </CarouselItem>
                            ) : (
                            popular.map((movie) => (
                                <CarouselItem key={movie.id}>
                                    <MovieFeatured id={movie.id} title={movie.title} description={movie.description} image={movie.backdropUrl || '/placerholder.png'} rating={parseFloat(movie.rating.toFixed(1))} inWatchlist={movie.inWatchlist} onToggle={() => toggleWatchlist(popular, movie.id)}/>
                                </CarouselItem>
                            )))
                        }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext/>
                    </Carousel>
                    <h1 className="text-3xl font-bold my-5">Popular now</h1>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        loading ? (
                            <>
                                <MovieCardSkeleton />
                                <MovieCardSkeleton />
                                <MovieCardSkeleton />
                                <MovieCardSkeleton />
                            </>
                        ):(
                        trending.map((movie) => (
                            <MovieCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterUrl || '/placerholder.png'} rating={movie.rating} inWatchlist={movie.inWatchlist} onToggle={() => toggleWatchlist(trending, movie.id)} />
                        )))
                    }
                    </div>
                    <h1 className="text-3xl font-bold my-5">Popular all time</h1>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        loading ? (
                            <>
                                <MovieCardSkeleton />
                                <MovieCardSkeleton />
                                <MovieCardSkeleton />
                                <MovieCardSkeleton />
                            </>
                        ):(
                        allTime.map((movie) => (
                            <MovieCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterUrl || '/placerholder.png'} rating={movie.rating} inWatchlist={movie.inWatchlist} onToggle={() =>toggleWatchlist(allTime, movie.id)} />
                        )))
                    }
                    </div>
                </div>
            </main>
        </div>
    );
}