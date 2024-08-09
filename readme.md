# Movie Metadata API

## Setup Instructions

1. Clone the repository:
    ```sh
    git clone <https://github.com/Youssefhikal93/Movie-MetaData-API>
    cd Movie-MetaData-API
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    npm run start:dev 
    npm run start:prod 
    ```
 The data will be seeded automaticully 
1. In "production" start:dev  friendly msgs for the users 
2. In "development" start:dev the errors is completly exposed for debugging 

## API Endpoints

### List Movies
## API Docmentation

1. @Swagger http://localhost:3000/api-docs/
the deafult port is 3000 as the configration set in the files

- **URL**: `/api/movies`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Number of movies per page (default: 10)
  - `genre`: Filter by genre
  - `title`: Filter by title
  - `sort`: Sort by 'title' or 'releaseDate' (default: release_date, DESC)

### Update Movie

- **URL**: `/api/movies/:id`
- **Method**: `PATCH`
- **Body**: JSON object with movie fields to update


## Error handling 

### handled errors 
 `In case there's any unhandled error , the custom msg will appear based on the envirmonet varrbales( production | development) ` 

 1. In "production" start:dev  friendly msgs for the users 
 2. In "development" start:dev the errors is completly exposed for debugging 




## Test 
    ```sh
    npm test
    ```



## Notes

1. if the server restarts , the data will be freshly loaded. 
