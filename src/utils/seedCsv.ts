import { Movie } from '../schemas/movieModel';
import csv from 'csv-parser';
import fs from 'fs';
import sqlConfig from '../../ormconfig';
import path from "path"

const filenme = 'movies.csv'
const filrPath = path.resolve(filenme)

const seedDatabase = async () => {
  await sqlConfig.initialize();

  fs.createReadStream(filrPath)
    .pipe(csv())
    .on('data', async (row) => {
      row.vote_average = parseInt(row.vote_average);
      row.runtime = row.runtime ? +row.runtime : null;
      row.genres = row.genres
        ? JSON.stringify(
          JSON.parse(row.genres.replace(/'/g, '"')).map((genre: { id: number; name: string }) => ({
            id: genre.id,
            name: genre.name.toLowerCase(),
          })),
        )
        : '[]';

      row.release_date = row.release_date ? new Date(row.release_date).toISOString().slice(0, 10) : null;

      const movie = Movie.create(row);
      await Movie.save(movie);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
    });
};
export default seedDatabase;
