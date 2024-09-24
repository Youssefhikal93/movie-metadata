import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import { validateOrReject, IsString, IsOptional, IsNumber, Min, Max, IsDefined } from 'class-validator';
import { Genre } from '../interfaces/movieBody';
import { BadRequestException } from '../middelwares/errorHandler';
import { parse, isValid, format } from 'date-fns';
import { Transform } from 'class-transformer';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'Title must be a string' })
  @IsDefined({ message: 'Title is required' })
  title: string;

  @Column({ nullable: true })
  @IsString({ message: 'overview must be a string' })
  @IsOptional()
  overview: string;

  @Column({ type: 'text', default: '[]', nullable: true })
  @IsOptional()
  genres: string;

  @Column({ type: 'date', nullable: true })
  release_date: string;

  @Column({ nullable: true })
  @IsNumber({}, { message: 'Runtime must be a number' })
  @IsOptional()
  runtime: number;

  @Column({ nullable: true })
  @IsNumber({}, { message: 'Vote average must be a number' })
  @Min(0, { message: 'Vote average must be at least 0' })
  @Max(10, { message: 'Vote average must be at most 10' })
  @IsOptional()
  vote_average: number;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await validateOrReject(this);

    const parsedGenres: Genre[] = JSON.parse(this.genres);

    if (!Array.isArray(parsedGenres)) {
      throw new BadRequestException('Genres must be an array of object or objects');
    }

    parsedGenres.forEach((genre) => {
      if (typeof genre !== 'object' || genre === null) {
        throw new BadRequestException('Invalid genre format , genre must be defined inside object {}');
      }

      if (typeof genre.id !== 'number') {
        throw new BadRequestException('Genre id must be a number');
      }

      if (typeof genre.name !== 'string') {
        throw new BadRequestException('Genre name must be a string');
      }
    });

    this.genres = JSON.stringify(parsedGenres);
  }

  @BeforeUpdate()
  private async validateAndConvert(): Promise<void> {
    await validateOrReject(this);

    const current = await Movie.findOne({ where: { id: this.id } });

    if (current && current.release_date !== this.release_date) {
      if (typeof this.release_date !== 'string' || this.release_date === ' ') {
        throw new BadRequestException('release_date must be a valid date in the format dd/MM/yyyy');
      }

      if (this.release_date && typeof this.release_date === 'string') {
        const parsedDate = parse(this.release_date, 'dd/MM/yyyy', new Date());
        if (!isValid(parsedDate)) {
          throw new BadRequestException('release_date must be a valid date in the format dd/MM/yyyy');
        }

        const minDate = new Date(1800, 0, 1);
        const maxDate = new Date();

        if (parsedDate < minDate || parsedDate > maxDate) {
          throw new BadRequestException('release_date must be a realistic date');
        }


        this.release_date = format(parsedDate, 'yyyy-MM-dd');
      }
    }
  }
}
