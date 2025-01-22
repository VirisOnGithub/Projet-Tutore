import { connectToDatabase } from "./getBdd";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const username = body.username;
    const password = body.password;

    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user (user_name, user_password) VALUES (?, ?)', [username, password], function (error, results) {
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