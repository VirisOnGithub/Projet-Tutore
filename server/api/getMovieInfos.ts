// https://developer.themoviedb.org/reference/movie-images
import { promises as fs } from "fs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const movieId = body.movieId;

    if (!movieId) {
        return sendRedirect(event, "/404");
    }

    const secretsPath = "secrets.txt";
    const secrets = await fs.readFile(secretsPath, "utf-8");
    try {
        const url =
            "https://api.themoviedb.org/3/movie/" + movieId + "?language=fr";
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer " + secrets,
            },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in poster handler:", error);
        throw error;
    }
});
