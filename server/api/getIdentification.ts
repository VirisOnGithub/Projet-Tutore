import { connectToDatabase } from './getBdd';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE user_name = ? AND user_password = ?', [email, password], function (error, results) {
                if (error) {
                    reject(createError({ statusCode: 500, message: 'Database query failed' }));
                    return;
                }
                if (results.length > 0) {
                    resolve({ success: true, user: results[0] });
                } else {
                    resolve({ success: false });
                }
            });
        });
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database connection failed' });
    }
});