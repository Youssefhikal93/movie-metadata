import request from 'supertest';
// import { createConnection } from 'typeorm';
import sqlConfig from '../../ormconfig';
import express,{ Application } from 'express';
import Server from '../server';



let app:Application = express()
 
let server :Server = new Server(app)

beforeAll(async () => {
  // (server as any).stopServer()

   await server.start()
// (await server as any).seedCsv()

// (server as any).startServer()

   
});

afterAll(async () => {
    (server as any).stopServer()

    await sqlConfig.destroy();
});

test('promiseDelay delays for 1s',() => {
    jest.useFakeTimers();
    return Promise.resolve().then(() => jest.advanceTimersByTime(100));
  });

describe('Movie API Endpoints', () => {
  it('should create a new movie', async () => {
    const response = await request(app)
      .post('/api/movies')
      .send({
        title: 'Inception',
        releaseDate: '16/07/2010',
        runtime: 148,
        overview: 'A thief who steals corporate secrets...',
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' }
        ],
        voteAverage: 8.8
      });

    expect(response.status).toBe(201);
    expect(response.body.data.newMovie).toHaveProperty('id');
    expect(response.body.data.newMovie.title).toBe('Inception');
  });

  it('should get the list of movies', async () => {
    const response = await request(app).get('/api/movies');
    expect(response.status).toBe(200);
    expect(response.body.data.moviesList).toHaveLength(10);
    // expect(response.body.data.moviesList[0]).toHaveLength(10);
  });

  it('should update a movie', async () => {
    const response = await request(app).
    patch('/api/movies/1')
    .send({
        title:'updated Movie'
    })
    expect(response.status).toBe(200);
    expect(response.body.data.updatedMovie.title).toBe('updated Movie');
  });

});
