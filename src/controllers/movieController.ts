import { NextFunction, Request, Response } from "express"
import { BadRequestException, NotfoundException } from "~/middelwares/errorHandler"
import { Movie } from "~/schemas/movieModel"
import { movieService } from "~/services/movieService"


class MovieController {
 public async getAll(req:Request,res:Response,next:NextFunction){
    // const {page=1,limit=10,genre,title,sort='release_date',order} = req.query

    // const query = getRepository(Movie).createQueryBuilder('movie')
   
    // if(title){
    //     query.where('movie.title ILIKE :title',{title:`%${title}%`})
    // }

    // if(genre && typeof genre === 'string'){
    //     query.where(`movie.genres::jsonb @> :genre`, { genre: JSON.stringify([{ name  :genre.toLowerCase() }]) })
    // }

    // if (sort) {
    //     query.orderBy(`movie.${sort}`,order as 'DESC' | 'ASC' );
    //   }
    // const allowedSorts = ['title', 'release_date'];
    // const allowedDirections = ['asc', 'desc'];
    // if (sort && typeof sort === 'string' && allowedSorts.includes(sort) && typeof direction === 'string' && allowedDirections.includes(direction.toLowerCase())) {
    //     query.orderBy(`movie.${sort}`, direction.toUpperCase() as 'ASC' | 'DESC');
    // } else {
    //     query.orderBy('movie.release_date', 'DESC');
    // }
    // const moviesList= await query
    // .orderBy('movie.release_date',"DESC")
    // .skip((+page-1)*+limit).take(+limit)
    // .getMany()

    const moviesList = await movieService.fetch(req.query)
    
    return res.status(200).json(
        {
            status:'succses',
            results:moviesList.length,
            data:{
                moviesList
            }
        }
    )
 }



    public async updateOne(req: any, res: Response, next: NextFunction) {
       const {id} = req.params
        const parsedId = parseInt(id, 10);
        if(isNaN(parsedId)|| null || undefined){
            return next(new BadRequestException('Movie id must be a number'))
        }

//         const {title,releaseDate,runTime,overview,genres,voteAverage}=req.body
// console.log(parsedId);
//     const movieRepository = getRepository(Movie);
//     const movie = await movieRepository.findOneBy({ id: parsedId });

//     if (!movie) {
//         return next( new NotfoundException(`No movie found with the selected id:${parsedId}`))
//       }

//       movie.title = title || movie.title;
//       movie.release_date = releaseDate || movie.release_date;
//       movie.runtime = runTime || movie.runtime;
//       movie.overview = overview || movie.overview;
//       movie.genres = genres || movie.genres;
//       movie.vote_average = voteAverage || movie.vote_average;

    //   const updatedMovie = await movieRepository.save(movie)
    const updatedMovie:Movie = await movieService.edit(parsedId, req.body)
      return res.status(200).json({
        status:'success',
        data:{
            updatedMovie
        }
      });

  }
     
}

export const movieController:MovieController = new MovieController()