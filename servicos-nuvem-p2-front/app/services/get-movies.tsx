'use server'

export type Movie = {
    id: number;
    title: string;
    description: string;
    posterUrl?: string;
    backdropUrl?: string;
    inWatchlist: boolean;
    rating: number;
    watched: boolean;
}

export async function getMovieByName(movie: string) {
    try {
        const res = await fetch(`http://localhost:8080/api/movies/search?title=${movie}`);
        const data = await res.json()

        return data;
    } catch (error) {
        return []
    }
}

export async function getPopular(user_id: number) {
    try {
        const res = await fetch(`http://localhost:8080/api/movies/popular?userId=${user_id}`);
        const data = await res.json()

        return data;
    } catch (error) {
        return []
    }
}

export async function getTrending(user_id: number) {
    try {
        const res = await fetch(`http://localhost:8080/api/movies/trending?userId=${user_id}`);
        const data = await res.json()
        return data
    }
    catch (error) {
        return []
    }

}

export async function getAllTime(user_id: number) {
    try {
        const res = await fetch(`http://localhost:8080/api/movies/atemporal?userId=${user_id}`);
        const data = await res.json()

        const shuffled = [...data].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, 4);
    } catch (error) {
        return []
    }
}

export async function getUserMovies(id: number) {
    try {
        const res = await fetch(`http://localhost:8080/api/watchlist/${id}`);
        const data = await res.json()

        return data
    } catch (error) {
        return []
    }
}

export async function addUserList(user_id: number, movie_id: number) {
    try {
        await fetch('http://localhost:8080/api/watchlist/add', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "userId": user_id,
                "movieId": movie_id,
                "userRating": 0,
                "watched": false
            })
        })
    } catch (error) {
        console.error(error)
    }
}

export async function removeUserList(user_id: number, movie_id: number) {
    try {
        await fetch(`http://localhost:8080/api/watchlist/remove/${user_id}/${movie_id}`, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error)
    }
}