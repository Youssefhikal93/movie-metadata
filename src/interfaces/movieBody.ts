export interface MovieBody {
  title?: string;
  releaseDate?: string;
  runtime?: number;
  overview?: string;
  genres?: Genre[];
  voteAverage?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface RequestedQuery {
  title?: string;
  genre?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
