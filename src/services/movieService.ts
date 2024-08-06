import { MovieBody } from "../interfaces/movieBody";
import { NotfoundException } from "../middelwares/errorHandler";
import { Movie } from "../schemas/movieModel";
import APIFeatures from "../utils/APIFeatuers";

class MovieService {
    public async edit(id:number,requestedBody:MovieBody):Promise<Movie>{
        
    const movie = await Movie.findOneBy({ id });

    if (!movie) {
        throw  new NotfoundException(`No movie found with the selected id:${id}`)
      }
  movie.title = requestedBody.title || movie.title;
  movie.release_date = requestedBody.releaseDate || movie.release_date;
  movie.runtime = requestedBody.runTime || movie.runtime;
  movie.overview = requestedBody.overview || movie.overview;
  movie.genres = requestedBody.genres ? JSON.stringify(requestedBody.genres) : movie.genres;
  movie.vote_average = requestedBody.voteAverage || movie.vote_average;

    const updatedMovie = await movie.save()
    updatedMovie.genres = JSON.parse(updatedMovie.genres.replace(/\\/g, ''))
    return updatedMovie
    }

    public async fetch(requestedQuery:any):Promise<Movie[]>{
   
    const query =  Movie.createQueryBuilder('movie')
    const apiFeatuers = new APIFeatures(query, requestedQuery)
    .filter()
    .sort()
    .paginate()
    const movies = await apiFeatuers.getResults()


    return movies.map(movie => {
      const parsedMovie = new Movie();
      parsedMovie.id = movie.id;
      parsedMovie.title = movie.title;
      parsedMovie.overview = movie.overview;
      parsedMovie.genres = JSON.parse(movie.genres.replaceAll("/",""));
      parsedMovie.release_date = movie.release_date;
      parsedMovie.runtime = movie.runtime;
      parsedMovie.vote_average = movie.vote_average;
      return parsedMovie;
    });
  }
    
  }


export const movieService:MovieService = new MovieService()