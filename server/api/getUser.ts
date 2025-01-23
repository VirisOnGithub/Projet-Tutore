import { connectToDatabase } from './getBdd';


export default defineEventHandler(async () => {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from user', function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                const usernames = results.map((result: { username: string }) => result.user_name);
                resolve(usernames);
            });
        });
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
});