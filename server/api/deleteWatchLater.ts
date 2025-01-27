import {connectToDatabase} from "~/server/api/getBdd";

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

    await deleteWatchLater(movieId, userId);
    console.log('added to favourite');

});