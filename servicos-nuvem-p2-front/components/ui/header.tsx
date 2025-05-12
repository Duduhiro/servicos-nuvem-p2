'use client'

import { BookmarkPlus, LogOut, Search, User } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next/client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";

interface HeaderProps {
    onSearch?: (name: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {

    const router = useRouter();
    const [movieName, setMovieName] = useState('');
    const [userId, setUserId] = useState(0);

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

    function logout() {
        deleteCookie('token')
        deleteCookie('user_id')
        deleteCookie('username')

        console.log('Logout')
        router.push("/")

        setUserId(0);
    }

    useEffect(() => {

        const UID = getCookie('user_id');
        setUserId(UID ? parseInt(UID as string, 10) : 0)

    }, []);


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
                    <Link href="/to-watch">
                        {
                            userId !== 0 ? (
                                <Button variant="ghost" size="sm" className="rounded-sm">
                                    My List
                                </Button>
                            ) : (
                                <></>
                            )
                        }
                    </Link>
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
                    {
                        userId === 0 ? (
                            <Link href="/login">
                                <Button variant="outline" size="sm" className="gap-2 rounded-sm">
                                    <User className="h-4 w-4" />
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className="flex rounded-sm border-[1px] items-center gap-2 font-semibold py-1 px-3 hover:bg-neutral-900 cursor-pointer">
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Login out
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="cursor-pointer" onClick={logout}>Logout</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )
                    }
                </div>
            </div>
        </header>
    )
}