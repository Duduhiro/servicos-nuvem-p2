'use client'

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import MovieCard from "@/components/ui/movie-card";
import MovieFeatured from "@/components/ui/movie-featured";
import { BookmarkPlus, Search, User } from "lucide-react";
import Link from "next/link";
import { getAllTime, getPopular, getTrending, Movie } from "@/app/services/get-movies";
import { useEffect, useState } from "react";
import { MovieCardSkeleton, MovieFeaturedSkeleton } from "./skeleton";

export default function Home() {
  
    // const popular = await getPopular();
    // const trending = await getTrending();

    const [popular, setPopular] = useState<Movie[]>([]);
    const [trending, setTrending] = useState<Movie[]>([]);
    const [allTime, setAllTime] = useState<Movie[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const popular = await getPopular();
                setPopular(popular);

                const trending = await getTrending();
                setTrending(trending);

                const allTime = await getAllTime();
                setAllTime(allTime);

            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        }
        loadMovies();

    }, []);

    return (
        <div>
            <header className="flex justify-center border-b-[1px] border-b-white">
                <div className="flex justify-between max-w-7xl w-full py-4">
                    <div className="flex items-center gap-2">
                        <BookmarkPlus className="h-6 w-6" />
                        <p className="text-2xl font-bold">WannaWatch</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <form className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search movies..." className="w-full bg-background pl-8 rounded-sm" />
                        </form>
                        <Link href="/to-watch">
                            <Button variant="ghost" size="sm" className="rounded-sm">
                                My List
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="gap-2 rounded-sm">
                                <User className="h-4 w-4" />
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
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
                                    <MovieFeatured id={movie.id} title={movie.title} description={movie.description} image={movie.backdropUrl || '/placerholder.png'} rating={parseFloat(movie.rating.toFixed(1))} watched={false} />
                                </CarouselItem>
                            )))
                        }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext/>
                    </Carousel>
                    <h1 className="text-3xl font-bold my-5">Popular now</h1>
                    <div className="flex start flex-wrap gap-4">
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
                            <MovieCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterUrl || '/placerholder.png'} rating={parseFloat(movie.rating.toFixed(1))} watched={false} />
                        )))
                    }
                    </div>
                    <h1 className="text-3xl font-bold my-5">Popular all time</h1>
                    <div className="flex start flex-wrap gap-4">
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
                            <MovieCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterUrl || '/placerholder.png'} rating={parseFloat(movie.rating.toFixed(1))} watched={false} />
                        )))
                    }
                    </div>
                </div>
            </main>
        </div>
    );
}

function FeaturedMovies({movies}: {movies: Movie[]}) {
    return (
        <Carousel className="mb-4">
            <CarouselContent>
            {
                movies.map((movie) => (
                    <CarouselItem key={movie.id}>
                        <MovieFeatured id={movie.id} title={movie.title} description={movie.description} image={movie.backdropUrl || '/placerholder.png'} rating={parseFloat(movie.rating.toFixed(1))} watched={false} />
                    </CarouselItem>
                ))
            }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
    )
}
