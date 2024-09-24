import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../middelwares/errorHandler';
import { Movie } from '../schemas/movieModel';
import { movieService } from '../services/movieService';
import { MovieBody } from '~/interfaces/movieBody';
import { format, isValid, parse } from 'date-fns';

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

  public async createMovie(req: Request, res: Response, next: NextFunction) {

    let releaseDate: string | null = null;

    if (req.body.releaseDate) {
      const parsedDate = parse(req.body.releaseDate, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        releaseDate = format(parsedDate, 'yyyy-MM-dd');
      } else {
        throw new BadRequestException('Invalid date format. Please use dd/MM/yyyy.');
      }
    }

    const newMovie = await movieService.addone(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        newMovie
      }
    })
  }
}


export const movieController: MovieController = new MovieController();
