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

async function luka(username: string, password: string): Promise<User> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from user where user_name=? and user_password=?', [username, password], function (error, results) {
                if (error) {
                    reject(error);
                    return;
                }
                console.log('The solution is: ', results[0]);
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
    const user: User = await luka(username, password);
    console.log(user);

    console.log('username', username);
    console.log('password', password);

    console.log('user.user_name', user.user_name);
    console.log('user.user_password', user.user_password);

    if (username === user.user_name && password === user.user_password) {
        console.log('User connected');
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