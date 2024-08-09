import { DataSource, DataSourceOptions } from "typeorm";
import { Movie } from "./src/schemas/movieModel";
import 'dotenv/config';



export const sqlConfig :DataSource =new DataSource( {
        type: 'sqlite',
      database: ':memory:',
      entities: [Movie],
      synchronize: true,
      logging: false,
    });
    
    

export default sqlConfig