import { connectToDatabase } from "./getBdd";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const movieId = body.movieId;
    const content = body.content;
    const rating = body.rating;
    const userId = body.userId;

    if (!movieId) {
        return sendRedirect(event, "/error-page");
    }
    if (!content) {
        return sendRedirect(event, "/error-page");
    }
    if (!rating) {
        return sendRedirect(event, "/error-page");
    }
    if (!userId) {
        return sendRedirect(event, "/error-page");
    }

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO comment (id_film, content, rating_user, id_user) VALUES (?, ?, ?, ?)', [movieId, content, rating, userId], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    } catch (error) {
        throw createError({statusCode: 500, message: 'Database query failed'});
    }
});