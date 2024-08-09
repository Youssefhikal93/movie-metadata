import { Request, Response, NextFunction } from 'express';
import { movieController } from '../controllers/movieController';
import { movieService } from '../services/movieService';
import { BadRequestException } from '../middelwares/errorHandler';

jest.mock('../services/movieService');

describe('MovieController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return a list of movies with status 200', async () => {
      const mockMoviesList = [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' },
      ];
      (movieService.fetch as jest.Mock).mockResolvedValue(mockMoviesList);

      req.query = {};

      await movieController.getAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'succses',
        results: mockMoviesList.length,
        data: {
          moviesList: mockMoviesList,
        },
      });
    });
  });

  describe('updateOne', () => {
    it('should update a movie and return it with status 200', async () => {
      const mockUpdatedMovie = { id: 1, title: 'Updated Movie' };
      (movieService.edit as jest.Mock).mockResolvedValue(mockUpdatedMovie);

      req.params = { id: '1' };
      req.body = { title: 'Updated Movie' };

      await movieController.updateOne(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          updatedMovie: mockUpdatedMovie,
        },
      });
    });

    it('should throw BadRequestException for an invalid movie id', async () => {
      req.params = { id: 'invalid' };

      try {
        await movieController.updateOne(req as Request, res as Response, next);
      } catch (error) {
        if (error instanceof BadRequestException) {
          expect(error.message).toBe('Movie id must be a positive number');
        } else {
          throw error;
        }
      }
    });
  });
});
