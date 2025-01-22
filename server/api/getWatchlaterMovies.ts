import { connectToDatabase } from './getBdd';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const userId = body.userId;

    if (!userId) {
        return sendRedirect(event, "/error-page");
    }

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM Watchlater WHERE id_user = ?', [userId], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        });
    } catch (error) {
        throw createError({statusCode: 500, message: 'Database query failed'});
    }
});