import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MovieCard from "@/components/ui/movie-card";
import { BookmarkPlus, Search, User } from "lucide-react";
import Link from "next/link";


const movies = [
    {
        id: 1,
        title: "Dune Part Two",
        image: "/placeholder.png",
        rating: 4.8,
        watched: false
    }
]


export default function Home() {
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
            <div className="max-w-7xl w-full pt-5">
                <div className="flex justify-between flex-wrap gap-2">
                    <MovieCard id={1} title="Dune: Part Two" image="/placeholder.png" rating={4.8} watched={true} />
                    <MovieCard id={1} title="Dune: Part Two" image="/placeholder.png" rating={4.8} watched={true} />
                    <MovieCard id={1} title="Dune: Part Two" image="/placeholder.png" rating={4.8} watched={true} />
                    <MovieCard id={1} title="Dune: Part Two" image="/placeholder.png" rating={4.8} watched={true} />
                </div>
            </div>
        </main>
    </div>
  );
}
