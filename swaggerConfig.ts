import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie-Metadata-API',
      version: '1.0.0',
      description: 'A simple Express Movie API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
        schemas: {
          Movie: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                description: 'The auto-generated id of the movie',
              },
              title: {
                type: 'string',
                description: 'The title of the movie',
              },
              overview: {
                type: 'string',
                description: 'The overview of the movie',
              },
              genres: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    name: {
                      type: 'string',
                    },
                  },
                },
              },
              release_date: {
                type: 'string',
                format: 'date',
                description: 'The release date of the movie',
              },
              runtime: {
                type: 'number',
                description: 'The runtime of the movie in minutes',
              },
              vote_average: {
                type: 'number',
                description: 'The average vote of the movie',
              },
            },
          },
        },
      },
    },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJsdoc(options);

export default (app:Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
