import connectToDatabase from "./getBdd";
import { Request, Response } from 'express';

export async function getUser(req: Request, res: Response) {
    try {
        const connexion = await connectToDatabase();
        const result = await connexion.query("SELECT * FROM user");
        console.log(result);
        res.status(200).json(result);
        return result;
    } catch (err) {
        console.error('Error in getUser:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}