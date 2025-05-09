'use server'


export async function getPopular() {
    const res = await fetch('http://localhost:8080/api/movies/popular');
    const data = await res.json()

    return data;
}

export async function getTrending() {
    const res = await fetch('http://localhost:8080/api/movies/trending');
    const data = await res.json()

    return data;
}