import { promises as fs } from 'fs';

export default defineEventHandler(async (event) => {
    const secretsPath = 'secrets.txt';
    const secrets = await fs.readFile(secretsPath, 'utf-8');
    console.log(`Secrets content: ${secrets}`);
    try {
      const body = await readBody(event);
      const title = body.title;
  
      if (!title) {
        throw new Error("Title is required");
      }
  
      const url = `https://www.omdbapi.com/?apikey=${secrets}&t=${title}`;
      console.log(`Fetching data from URL: ${url}`);
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(`Data fetched: ${JSON.stringify(data.Poster)}`);
      return data;
    } catch (error) {
      console.error('Error in poster handler:', error);
      throw error;
    }
  });