import { SelectQueryBuilder } from 'typeorm';
import APIFeatures from '../utils/APIFeatures';
import { RequestedQuery } from '../interfaces/movieBody';
import { BadRequestException } from '../middelwares/errorHandler';

describe('APIFeatures', () => {
  let queryBuilder: SelectQueryBuilder<any>;
  let apiFeatures: APIFeatures<any>;

  beforeEach(() => {
    queryBuilder = {
      alias: 'movie',
      andWhere: jest.fn().mockReturnThis(),
      // andWhere: jest.fn(()=>this),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    } as any as SelectQueryBuilder<any>;
  });

  it('should filter by genre and title', () => {
    const queryString: RequestedQuery = { genre: 'action', title: 'test' };
    apiFeatures = new APIFeatures(queryBuilder, queryString);

    apiFeatures.filter();

    expect(queryBuilder.andWhere).toHaveBeenCalledTimes(2);
    expect(queryBuilder.andWhere).toHaveBeenCalledWith(
      `EXISTS (SELECT 1 FROM json_each(movie.genres) WHERE json_each.value->>'name' LIKE :genre)`,
      { genre: `%action%` },
    );
    expect(queryBuilder.andWhere).toHaveBeenCalledWith('movie.title LIKE :title', { title: '%test%' });
  });

  it('should sort by title in ascending order', () => {
    const queryString: RequestedQuery = { sort: 'title' };
    apiFeatures = new APIFeatures(queryBuilder, queryString);

    apiFeatures.sort();

    expect(queryBuilder.orderBy).toHaveBeenCalledWith('movie.title', 'ASC');
  });

  it('should sort by release_date in descending order by default', () => {
    const queryString: RequestedQuery = {};
    apiFeatures = new APIFeatures(queryBuilder, queryString);

    apiFeatures.sort();

    expect(queryBuilder.orderBy).toHaveBeenCalledWith('movie.release_date', 'DESC');
    expect(queryBuilder.orderBy).toHaveBeenCalledTimes(1);
    // expect(()=>apiFeatures.sort()).toHaveBeenCalled();

  });

  it('should paginate results', () => {
    const queryString: RequestedQuery = { page: 2, limit: 10 };
    apiFeatures = new APIFeatures(queryBuilder, queryString);

    apiFeatures.paginate();

    expect(queryBuilder.skip).toHaveBeenCalledWith(10);
    expect(queryBuilder.take).toHaveBeenCalledWith(10);
  });

  it('should throw BadRequestException for invalid page number', () => {
    const queryString: RequestedQuery = { page: 'invalid' } as unknown as RequestedQuery;
    apiFeatures = new APIFeatures(queryBuilder, queryString);
    expect(() => apiFeatures.paginate()).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for invalid limit', () => {
    const queryString: RequestedQuery = { limit: 'invalid' } as unknown as RequestedQuery;
    apiFeatures = new APIFeatures(queryBuilder, queryString);

    expect(() => apiFeatures.paginate()).toThrow(BadRequestException);
  });
});
