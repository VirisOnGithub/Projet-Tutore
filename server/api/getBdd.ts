import { createConnection } from 'mysql';

async function connectToDatabase() {
    const connection = await createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'projetTutore'
    });

    console.log('Connected to the database');
    return connection;
}

connectToDatabase().catch(err => {
    console.error('Error connecting to the database:', err);
});

export default connectToDatabase;