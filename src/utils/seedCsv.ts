// src/utils/seed.ts
import { createConnection } from 'typeorm';
import { Movie } from '../schemas/movieModel';
import csv from 'csv-parser';
import fs from 'fs';

const seedDatabase = async () => {
  const connection:any = await createConnection();
  const movieRepository = connection.getRepository(Movie);

  fs.createReadStream('movies.csv')
    .pipe(csv())
    .on('data', async (row) => {
     
        row.vote_average = parseInt(row.vote_average)
        row.runtime = row.runtime ? +row.runtime : null
        row.genres = row.genres ? JSON.parse(row.genres.replace(/'/g, '"')).map((genre: { id: number; name: string; }) => ({
            id: genre.id,
            name: genre.name.toLowerCase(),
          })) : []
          row.release_date ? new Date(row.release_date).toISOString() : null

      const movie = movieRepository.create(row);
      await movieRepository.save(movie);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};

seedDatabase().catch(error => console.log(error));
