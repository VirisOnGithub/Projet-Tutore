import { connectToDatabase } from './getBdd';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const userId = body.userId;

    if (!userId) {
        return sendRedirect(event, "/404");
    }

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('SELECT id_film FROM favourite WHERE id_user = ?', [userId], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                const movieIds = results.map((result: { id_film: number }) => result.id_film);
                resolve(movieIds);
            });
        });
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
});