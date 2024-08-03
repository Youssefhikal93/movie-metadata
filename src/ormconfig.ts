import { ConnectionOptions  } from "typeorm";
import { Movie } from "./schemas/movieModel";


export const pgConfig :ConnectionOptions = {
            type:"postgres",
            host: process.env.DATABASE_HOST!,
            port:+process.env.DATABASE_PORT!,
            username:process.env.DATABASE_USERNAME!,
            password:process.env.DATABASE_PASSWORD!,
            database:'movielex',
            entities:[Movie],
            synchronize:true

}

export default pgConfig