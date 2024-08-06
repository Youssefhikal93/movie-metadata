# Movie Metadata API

## Setup Instructions

1. Clone the repository:
    ```sh
    git clone <(https://github.com/Youssefhikal93/movie-metadata/tree/final-version)>
    cd movie-metadata-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    npm run start:dev
    ```
 The data will be seeded automaticully 

## API Endpoints

### List Movies

####Api docmentation 
http://localhost:{PORT}/api-docs/

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

## Example Requests

### List Movies

```sh
curl -X GET "http://localhost:80/api/movies?page=1&limit=10&genre=Action&sort=title"



## Error handling 

### handled errors 
 `In case there's any unhandled error , the custom msg will appear based on the envirmonet varrbales( production | development) ` 

 1. In "production"  friendly msgs for the users 
 2. In "development" the errors is completly exposed for debugging 




## Test 
```sh
    npm test 
    ```
Testing includes:

Endpoint verification
Error handling checks


Notes
Make sure your environment variables are correctly set for NODE_ENV to toggle between development and production modes.
Data seeding will occur automatically when the server starts. Ensure the movies.csv file is present in the root directory for seeding.
