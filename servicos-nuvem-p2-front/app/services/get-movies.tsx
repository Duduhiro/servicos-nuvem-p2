'use server'

export type Movie = {
    id: number;
    title: string;
    description: string;
    backdropUrl: string;
    rating: number;
    watched: boolean;
}

export async function getPopular() {
    const res = await fetch('http://localhost:8080/api/movies/popular');
    const data = await res.json()

    console.log(data)

    return data;
}

export async function getTrending() {
    const res = await fetch('http://localhost:8080/api/movies/trending');
    const data = await res.json()

    return data;
}