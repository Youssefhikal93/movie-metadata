import { MovieBody, RequestedQuery } from '../interfaces/movieBody';
import { BadRequestException, NotfoundException } from '../middelwares/errorHandler';
import { Movie } from '../schemas/movieModel';
import APIFeatures from '../utils/APIFeatures';

class MovieService {

  public async addone(requestedBody: MovieBody): Promise<Movie> {
    const newMovie = Movie.create(
      {
        title: requestedBody.title,
        runtime: requestedBody.runtime,
        overview: requestedBody.overview,
        genres: requestedBody.genres ? JSON.stringify(requestedBody.genres) : '[]',
        release_date: requestedBody.releaseDate,
        vote_average: requestedBody.voteAverage
      }
    )
    const savedMovie = await newMovie.save()
    return savedMovie
  }

  public async edit(id: number, requestedBody: MovieBody): Promise<Movie> {
    const movie = await Movie.findOneBy({ id });


    if (!movie) {
      throw new NotfoundException(`No movie found with the selected id:${id}`);
    }

    // if (movie?.id <= 0 || isNaN(movie.id)) {
    //   throw new BadRequestException('Movie id must be a positive number');

    // }

    // const updatedFields: Partial<Movie> = {
    //   title: requestedBody.title || movie.title,
    //   release_date: requestedBody.releaseDate || movie.release_date,
    //   runtime: requestedBody.runtime || movie.runtime,
    //   overview: requestedBody.overview || movie.overview,
    //   genres: requestedBody.genres ? JSON.stringify(requestedBody.genres) : movie.genres,
    //   vote_average: requestedBody.voteAverage || movie.vote_average,
    // };

    // await Movie.update({ id }, updatedFields);
    // await Movie.save(updatedFields)

    // const updatedMovie = await Movie.findOneBy({ id });

    // if (!updatedMovie) {
    //   throw new NotfoundException(`Failed to retrieve updated movie with id:${id}`);
    // }
    movie.title = requestedBody.title || movie.title;
    movie.release_date = requestedBody.releaseDate || movie.release_date;
    movie.runtime = requestedBody.runtime || movie.runtime;
    movie.overview = requestedBody.overview || movie.overview;
    movie.genres = requestedBody.genres ? JSON.stringify(requestedBody.genres) : movie.genres;
    movie.vote_average = requestedBody.voteAverage || movie.vote_average;

    const updatedMovie = await movie.save();

    if (typeof updatedMovie.genres === 'string') {
      updatedMovie.genres = JSON.parse(updatedMovie.genres.replace(/\\/g, ''));
    }
    return updatedMovie;
  }

  public async fetch(requestedQuery: RequestedQuery): Promise<Movie[]> {
    const query = Movie.createQueryBuilder('movie');
    const apiFeatuers = new APIFeatures(query, requestedQuery).filter().
      sort().
      limit().
      paginate();
    const movies = await apiFeatuers.getResults();

    return movies
    // return movies.map((movie) => {
    //   const parsedMovie = new Movie();
    //   parsedMovie.id = movie.id;
    //   parsedMovie.title = movie.title;
    //   parsedMovie.overview = movie.overview;
    //   parsedMovie.genres = JSON.parse(movie.genres.replaceAll('/', ''));

    //   parsedMovie.release_date = movie.release_date;
    //   parsedMovie.runtime = movie.runtime;
    //   parsedMovie.vote_average = movie.vote_average;
    //   return parsedMovie;
    // });
  }
}

export const movieService: MovieService = new MovieService();
