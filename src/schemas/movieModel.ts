import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert } from "typeorm";
import { validateOrReject, IsString, IsOptional, IsDateString, IsNumber, Min, Max, IsJSON, IsDefined } from "class-validator";

@Entity()
export class Movie extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({message: 'Title must be a string'})
  @IsDefined({message:'Title is required'})
  title: string;

  @Column({ nullable: true })
  @IsString({message: 'overview must be a string'})
  @IsOptional()
  overview: string;

  @Column({ type: 'text', default: '[]', nullable: true })
  @IsJSON({ message: 'Genres must be a valid JSON string' })
  @IsOptional()
  genres: string;

  @Column({ type: 'date' })
  @IsDateString()
  @IsOptional()
  release_date: string;

  @Column({ nullable: true })
  @IsNumber({},{ message: 'Runtime must be a number'})
  @IsOptional()
  runtime: number;

  @Column({ nullable: true })
  @IsNumber({},{ message: 'Vote average must be a number' })
  @Min(0, { message: 'Vote average must be at least 0' })
  @Max(10, { message: 'Vote average must be at most 10' })
  @IsOptional()
  vote_average: number;

  @BeforeInsert()
  @BeforeUpdate()
  private async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
