import { movieService } from '../services/movieService';
import { Movie } from '../schemas/movieModel';
import { NotfoundException } from '../middelwares/errorHandler';
import APIFeatures from '../utils/APIFeatures';

jest.mock('../schemas/movieModel');
jest.mock('../utils/APIFeatures');

describe('MovieService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('edit', () => {
    it('should successfully update a movie', async () => {
      const movieId = 1;
      const updatedData = {
        title: 'Updated Movie Title',
        runTime: 120,
        overview: 'Updated Overview',
        voteAverage: 8.5,
      };

      const mockMovie = {
        id: movieId,
        title: 'Old Movie Title',
        genres: [{ id: 1, name: 'Action' }],
        save: jest.fn().mockResolvedValue({
          id: movieId,
          title: 'Updated Movie Title',
          runtime: 120,
          overview: 'Updated Overview',
          vote_average: 8.5,
        }),
      };

      (Movie.findOneBy as jest.Mock).mockResolvedValue(mockMovie);

      const result = await movieService.edit(movieId, updatedData);

      expect(result.title).toBe('Updated Movie Title');
      expect(result.runtime).toBe(120);
      expect(mockMovie.save).toHaveBeenCalledTimes(1);
    });

    it('should throw NotfoundException if the movie does not exist',  () => {
      const movieId = 999;
      const updatedData = { title: 'Non-Existent Movie' };

      (Movie.findOneBy as jest.Mock).mockResolvedValue(undefined);

       expect(movieService.edit(movieId, updatedData)).rejects.toThrow(NotfoundException);
    });
  });

  describe('fetch', () => {
    it('should return a list of movies', async () => {
      const requestedQuery = { title: 'Movie', sort: 'release_date', page: 1, limit: 2 };
      const mockMovies = [
        { id: 1, title: 'Movie 1', genres: '["Action"]' },
        { id: 2, title: 'Movie 2', genres: '["Drama"]' },
      ];

      (Movie.createQueryBuilder as jest.Mock).mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        fields: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockMovies),
      } as unknown as typeof APIFeatures);

      (APIFeatures as jest.Mock).mockImplementation(() => ({
        filter: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        paginate: jest.fn().mockReturnThis(),
        getResults: jest.fn().mockResolvedValue(mockMovies),
      }));

      const result = await movieService.fetch(requestedQuery);

      expect(result.length).toBe(2);
      expect(result[0].title).toBe('Movie 1');
    });



    describe("add one",()=>{

      it('should create a new movie',async ()=>{
        const requestedBody = {
          title: 'New Movie',
          runtime: 150,
          overview: 'A great movie about something.',
          voteAverage: 8.5,
          releaseDate:"1/1/2024",
          genre:'[]'
        };

        const mockmovie = {
          save:jest.fn().mockResolvedValue({
            id:1,
            title: 'New Movie',
            runtime: 150,
            overview: 'A great movie about something.',
            voteAverage: 8.5,
            releaseDate:"1/1/2024",
            genre:'[]',
          }),
        } as any as Movie

        (Movie.create as jest.Mock).mockReturnValue(mockmovie);

        // Call the method
        const result = await movieService.addone(requestedBody);
        
        expect(result.title).toBe('New Movie')
        expect(mockmovie.save).toHaveBeenCalledTimes(1)
        expect(Movie.create).toHaveBeenCalledWith({
          title: 'New Movie',
          runtime: 150,
          overview: 'A great movie about something.',
          genres: '[]',
          release_date:"1/1/2024",
          vote_average: 8.5,
        });

      })
    })

  });
});
