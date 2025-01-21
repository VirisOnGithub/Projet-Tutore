import { connectToDatabase } from "./getBdd";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const movieId = body.movieId;

    if (!movieId) {
        return sendRedirect(event, "/error-page");
    }

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('select rating_user, user_name, content from comment join user using (id_user) where id_film=?', [movieId], function (error, results) {
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