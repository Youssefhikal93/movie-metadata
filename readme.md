# Movie Metadata API

## Setup Instructions

1. Clone the repository:
    ```sh
    git clone <repository-url>
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

## API Endpoints

### List Movies

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
curl -X GET "http://localhost:3000/api/movies?page=1&limit=10&genre=Action&sort=title"


## Error handling 

### handled errors 
 `in case there's any unhandled error , the enviroment varibale has to be production or development in .env file ` 

 1. In "production"  friendly msgs for the users 
 2. In "development" the errors is completly exposed for debugging 

