import { connectToDatabase } from "./getBdd";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const movieId = body.movieId;
    const userId = body.userId;

    if (!movieId) {
        return sendRedirect(event, "/404");
    }
    if (!userId) {
        return sendRedirect(event, "/404");
    }

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO watchlater (id_film, id_user) VALUES (?, ?)', [movieId, userId], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
});