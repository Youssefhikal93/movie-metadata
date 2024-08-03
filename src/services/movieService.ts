import { getRepository } from "typeorm";
import { MovieBody } from "~/interfaces/movieBody";
import { BadRequestException, NotfoundException } from "~/middelwares/errorHandler";
import { Movie } from "~/schemas/movieModel";

class MovieService {
    public async edit(id:number,requestBody:MovieBody):Promise<Movie>{
        
    const {title,releaseDate,runTime,overview,genres,voteAverage}=requestBody
    const movieRepository = getRepository(Movie);
    const movie = await movieRepository.findOneBy({ id });

    if (!movie) {
        throw  new NotfoundException(`No movie found with the selected id:${id}`)
      }

      movie.title = title || movie.title;
      movie.release_date = releaseDate || movie.release_date;
      movie.runtime = runTime || movie.runtime;
      movie.overview = overview || movie.overview;
      movie.genres = genres || movie.genres;
      movie.vote_average = voteAverage || movie.vote_average;

      
    return movie
    }

    public async fetch(requestedQuery:any):Promise<Movie[]>{
        const {page=1,limit=10,genre,title,} = requestedQuery

        const query = getRepository(Movie).createQueryBuilder('movie')
       
        if(title){
            query.where('movie.title ILIKE :title',{title:`%${title}%`})
        }
    
        if(genre && typeof genre === 'string'){
            query.where(`movie.genres::jsonb @> :genre`, { genre: JSON.stringify([{ name  :genre.toLowerCase() }]) })
        }

    const movies= await query
    .orderBy('movie.release_date',"DESC")
    .skip((+page-1)*+limit).take(+limit)
    .getMany()

    return movies
    }
   
}

export const movieService:MovieService = new MovieService()