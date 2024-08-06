
import request from 'supertest';
import createTestServer from './setup.test';
import sqlConfig from '../../ormconfig';
import Server from 'src/server';
import { Movie } from '../schemas/movieModel';
import { Application } from 'express';

let app:Application

beforeAll(async()=>{
  app = await createTestServer()
})

afterAll(async () => {
 await sqlConfig.destroy()
//  process.exit(1)
});

describe('Movie Endpoints', () => {
  it('should list movies with 10 results', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.moviesList).toHaveLength(10);
  })
})

it('should update a movie', async () => {
  const movie = new Movie();
  movie.title = 'Initial Title';
  movie.release_date = '2024-01-01';
  await movie.save();

  const res = await request(app)
    .patch(`/api/movies/${movie.id}`)
    .send({ title: 'Updated Title' });
  expect(res.statusCode).toEqual(200);
  expect(res.body.data.updatedMovie.title).toEqual('Updated Title');
});

it('should return error for invalid movie id on update', async () => {
  const res = await request(app)
    .patch('/api/movies/invalidId')
    .send({ title: 'Updated Title' });
  expect(res.statusCode).toEqual(400);
  expect(res.body.message).toEqual('Movie id must be a positive number');
});

it('should return error for non-existing movie id on update', async () => {
  const res = await request(app)
    .patch('/api/movies/999')
    .send({ title: 'Updated Title' });
  expect(res.statusCode).toEqual(404);
  expect(res.body.message).toEqual(`No movie found with the selected id:999`)
});
