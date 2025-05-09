'use server'

export type Movie = {
    id: number;
    title: string;
    description: string;
    posterUrl?: string;
    backdropUrl?: string;
    rating: number;
    watched: boolean;
}

export async function getPopular() {
    try {
        const res = await fetch('http://localhost:8080/api/movies/popular');
        const data = await res.json()

        return data;
    } catch (error) {
        return []
    }
}

export async function getTrending() {
    try {
        const res = await fetch('http://localhost:8080/api/movies/trending');
        const data = await res.json()
        return data
    }
    catch (error) {
        return []
    }

}

export async function getAllTime() {
    try {
        const res = await fetch('http://localhost:8080/api/movies/atemporal');
        const data = await res.json()

        const shuffled = [...data].sort(() => 0.5 - Math.random());

        console.log(shuffled)

        return shuffled.slice(0, 4);
    } catch (error) {
        return []
    }
}