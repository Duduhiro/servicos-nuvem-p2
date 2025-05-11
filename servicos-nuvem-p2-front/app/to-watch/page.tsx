'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MovieCard from "@/components/ui/movie-card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserMovies, Movie } from "../services/get-movies";

export default function Page() {
    
    const [showWatched, setShowWatched] = useState(false)
    const [minRating, setMinRating] = useState([0])
    const [searchTitle, setSearchTitle] = useState("")

    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        const loadMovies = async () => {
            try {
                const allTime = await getUserMovies(1);
                console.log(allTime)
                setMovies(allTime);

            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }
        loadMovies();

    }, []);

    // const filteredMovies = movies.filter((movie) => {
    //     // Filter by watched status
    //     if (showWatched !== movie.watched) return false

    //     // Filter by minimum rating
    //     if (movie.rating < minRating[0]) return false

    //     // Filter by title search
    //     if (searchTitle && !movie.title.toLowerCase().includes(searchTitle.toLowerCase())) return false

    //     return true
    // })

    return (
        <div className="px-4 py-6 flex justify-center w-full">
            <div className="w-full max-w-7xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-1"><ChevronLeft className="h-4 w-4"/>Back</Button>
                    </Link>
                    <h1 className="text-3xl font-bold">My To-Watch List</h1>
                </div>
                <div className="mb-8 rounded-md border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Filters</h2>
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2 w-1/4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="watched-filter">Show {showWatched ? "Watched" : "Unwatched"}</Label>
                                <Switch id="watched-filter" checked={showWatched} onCheckedChange={setShowWatched} />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {showWatched ? "Showing movies you've already watched" : "Showing movies you haven't watched yet"}
                            </p>
                        </div>
                        <div className="grow flex justify-end">
                            <div className="w-64 flex flex-col gap-4">
                                <Label htmlFor="rating-filter">Minimum Rating: {minRating[0]}/5</Label>
                                <Slider id="rating-filter" min={0} max={5} step={0.1} value={minRating} onValueChange={setMinRating} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-1/4">
                            <Label htmlFor="title-filter">Search by Title</Label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="title-filter"
                                    type="search"
                                    placeholder="Enter movie title..."
                                    className="pl-8"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {movies.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    image={movie.posterUrl}
                                    rating={movie.rating}
                                    watched={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                            <h3 className="text-xl font-medium">No movies match your filters</h3>
                            <p className="mt-2 text-muted-foreground">Try adjusting your filter settings to see more results.</p>
                            <Button
                                onClick={() => {
                                setShowWatched(false)
                                setMinRating([0])
                                setSearchTitle("")
                                }}
                                variant="outline"
                                className="mt-4"
                            >
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}