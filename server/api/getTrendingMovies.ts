// https://developer.themoviedb.org/reference/movie-images

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const page = body.page || 1;

    const secrets = process.env.TMDB_API_KEY;
    try {
        const url =
            "https://api.themoviedb.org/3/trending/movie/day?language=fr&page=" + page;
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
