import { verify } from 'crypto';
import { connectToDatabase } from './getBdd';
import { z } from 'zod';

interface Connect {
    username: string,
    password: string
}

interface User {
    id_user: number,
    user_name: string,
    user_password: string
}

async function luka(username: string): Promise<User> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from user where user_name=?', [username], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    catch (error) {
        throw createError({ statusCode: 500, message: 'Database query failed' });
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const username = body.username;
    const password = body.password;
    const user: User = await luka(username);

    if (username === user.user_name && (await verifyPassword(user.user_password, password))) {
        console.log(await getUserSession(event));
        await setUserSession(event, {
            user: {
                id: user.id_user,
                username: user.user_name
            }
        });
        console.log((await getUserSession(event)));
        console.log(event.context.session);
        return {}
    }
    throw createError({ statusCode: 401, message: 'Invalid credentials' });

});