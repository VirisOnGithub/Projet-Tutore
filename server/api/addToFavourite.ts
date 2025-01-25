import { connectToDatabase } from "./getBdd";

async function addToFavourite(movieId: number, userId: number): Promise<void> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO favourite (id_film, id_user) VALUES (?, ?)', [movieId, userId], function (error, results) {
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
}

async function deleteWatchLater(movieId: number, userId: number): Promise<void> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM watchlater WHERE id_user=? AND id_film=?', [userId, movieId], function (error, results) {
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
}

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

    await addToFavourite(movieId, userId);
    await deleteWatchLater(movieId, userId);
    console.log('added to favourite');

});