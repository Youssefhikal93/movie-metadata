import { Movie } from '../schemas/movieModel';
import sqlConfig from '../../ormconfig';

describe('Movie Model', () => {
  beforeAll(async () => {
    await sqlConfig.initialize();
  });

  afterAll(async () => {
    await sqlConfig.destroy();
  });

  beforeEach(async () => {
    sqlConfig.getRepository(Movie).clear();
  });

  describe('Validation', () => {
    it('should throw error if genre format is invalid', async () => {
      const movie = new Movie();
      movie.title = 'Test Movie';
      movie.genres = JSON.stringify([{ id: 'invalid', name: 'Action' }]);
      await expect(movie.validate()).rejects.toThrow('Genre id must be a number');
    });

    it('should successfully validate if all fields are correct', async () => {
      const movie = new Movie();
      movie.title = 'Test Movie';
      movie.genres = JSON.stringify([{ id: 1, name: 'Action' }]);
      movie.release_date = '2024-08-09';
      await expect(movie.validate()).resolves.not.toThrow();
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should convert release_date to yyyy-MM-dd format on update', async () => {
      const movie = new Movie();
      movie.title = 'Test Movie';
      movie.genres = JSON.stringify([{ id: 1, name: 'Action' }]);
      movie.release_date = '09/08/2024';
      await Movie.save(movie);

      movie.release_date = '10/08/2024';
      await Movie.save(movie);

      const savedMovie = await Movie.findOneBy({ id: movie.id });
      expect(savedMovie?.release_date).toBe('2024-08-10');
    });

    it('should throw error if release_date is invalid during update', async () => {
      const movie = new Movie();
      movie.title = 'Test Movie';
      movie.genres = JSON.stringify([{ id: 1, name: 'Action' }]);
      movie.release_date = '09/08/2024';
      await Movie.save(movie);

      movie.release_date = 'Invalid Date';
      await expect(Movie.save(movie)).rejects.toThrow('release_date must be a valid date in the format dd/MM/yyyy');
    });
  });
});
