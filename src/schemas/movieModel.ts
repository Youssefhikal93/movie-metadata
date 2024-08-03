import {BaseEntity, Entity , Column,  PrimaryGeneratedColumn} from "typeorm"
import { Genre } from "~/interfaces/movieBody";

@Entity ('movie')
export class Movie extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string;

    @Column({
        nullable:true
    })
    overview:string

    
    @Column("jsonb",{default: [] , nullable:true})
    genres:Genre[] 

     @Column({type:'date'})
     release_date:string

     @Column({nullable:true})
     runtime:number 

     @Column({nullable:true})
     vote_average:number 

 
}