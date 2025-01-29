import { connectToDatabase } from "./getBdd";

async function deleteComment(id: number): Promise<void> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM comment WHERE id_user=?', [id], function (error, results) {
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

async function deleteWatchLater(id: number): Promise<void> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM watchlater WHERE id_user=?', [id], function (error, results) {
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

async function deleteFavoutite(id: number): Promise<void> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM favourite WHERE id_user=?', [id], function (error, results) {
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

async function deleteUser(id: number): Promise<void> {
    try {
        const connection = await connectToDatabase();
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM user WHERE id_user=?', [id], function (error, results) {
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
    const id = body.userId;

    await deleteComment(id);
    await deleteFavoutite(id);
    await deleteWatchLater(id);
    await deleteUser(id);

});