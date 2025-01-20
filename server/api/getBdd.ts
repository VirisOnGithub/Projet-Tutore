import { createConnection } from 'mysql';

export async function connectToDatabase() {
    const connection = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'projetTutore'
    });

    console.log('Connected to the database');
    return connection;
}

export default defineEventHandler(async () => {
    return connectToDatabase();
});