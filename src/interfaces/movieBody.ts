
export interface MovieBody {
     title : string
     releaseDate :string
     runTime :number
      overview :string
      genres :Genre[]
     voteAverage:number

}

export interface Genre {
    id:number 
    name:string
}