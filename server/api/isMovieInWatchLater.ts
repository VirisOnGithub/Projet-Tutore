import { connectToDatabase } from "./getBdd";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const movieId = body.movieId;
    const userId = body.userId;

    if (!movieId) {
        return sendRedirect(event, "/error-page");
    }
    if (!userId) {
        return sendRedirect(event, "/error-page");
    }

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('select count(*) as nbFilms from watchlater where id_film=? and id_user=?', [movieId, userId], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0].nbFilms > 0);
            });
        });
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
});