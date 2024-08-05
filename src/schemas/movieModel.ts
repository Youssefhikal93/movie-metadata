import {BaseEntity, Entity , Column,  PrimaryGeneratedColumn} from "typeorm"

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

    
    @Column({ type: 'text', default: '[]', nullable: true })
     genres: string;

     @Column({type:'date'})
     release_date:string

     @Column({nullable:true})
     runtime:number 

     @Column({nullable:true})
     vote_average:number 

 
}