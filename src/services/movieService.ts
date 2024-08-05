import { MovieBody } from "../interfaces/movieBody";
import { NotfoundException } from "../middelwares/errorHandler";
import { Movie } from "../schemas/movieModel";
import APIFeatures from "../utils/APIFeatuers";

class MovieService {
    public async edit(id:number,requestBody:MovieBody):Promise<Movie>{
        
    const {title,releaseDate,runTime,overview,genres,voteAverage}=requestBody
    const movie = await Movie.findOneBy({ id });

    if (!movie) {
        throw  new NotfoundException(`No movie found with the selected id:${id}`)
      }

      movie.title = title || movie.title;
      movie.release_date = releaseDate || movie.release_date;
      movie.runtime = runTime || movie.runtime;
      movie.overview = overview || movie.overview;
      movie.genres = genres ? JSON.stringify(genres) : movie.genres;
      movie.vote_average = voteAverage || movie.vote_average;

    const updatedMovie = await Movie.save(movie)
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