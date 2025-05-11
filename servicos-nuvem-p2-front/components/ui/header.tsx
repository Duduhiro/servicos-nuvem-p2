'use client'

import { BookmarkPlus, Search, User } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
    onSearch?: (name: string) => void;
}

export default function Header({onSearch}: HeaderProps) {
    
    const router = useRouter();
    const [movieName, setMovieName] = useState('');

    const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMovieName(event.target.value)
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const input = event.currentTarget.querySelector('input');
        if (input && input.value.trim() !== '') {
            if (onSearch) {
                onSearch(movieName);
            } else {
                router.push(`/search-movie?name=${encodeURIComponent(movieName)}`)
            }
        }
    }

    // const storedUserId = typeof window !== "undefined" ? Number(localStorage.getItem('user_id')) : 0;
    const storedUserId = 1

    return (
        <header className="flex justify-center border-b-[1px] border-b-white">
            <div className="flex justify-between max-w-7xl w-full py-4">
                <div className="flex items-center gap-2">
                    <BookmarkPlus className="h-6 w-6" />
                    <Link href="/">
                        <p className="text-2xl font-bold">WannaWatch</p>
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <form className="relative w-full max-w-sm" onSubmit={handleSearch}>
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            id="search" 
                            onChange={(event) => updateName(event)} 
                            value={movieName}
                            type="search" 
                            placeholder="Search movies..." 
                            className="w-full bg-background pl-8 rounded-sm" />
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
    )
}