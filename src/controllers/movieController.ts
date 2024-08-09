import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../middelwares/errorHandler';
import { Movie } from '../schemas/movieModel';
import { movieService } from '../services/movieService';

class MovieController {
  public async getAll(req: Request, res: Response) {
    const moviesList = await movieService.fetch(req.query);

    return res.status(200).json({
      status: 'succses',
      results: moviesList.length,
      data: {
        moviesList,
      },
    });
  }

  public async updateOne(req: any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const parsedId = +id;

    if (isNaN(parsedId) || parsedId <= 0 || typeof parsedId !== 'number') {
      throw new BadRequestException('Movie id must be a positive number');
    }

    const updatedMovie: Movie = await movieService.edit(parsedId, req.body);
    return res.status(200).json({
      status: 'success',
      data: {
        updatedMovie,
      },
    });
  }
}

export const movieController: MovieController = new MovieController();
