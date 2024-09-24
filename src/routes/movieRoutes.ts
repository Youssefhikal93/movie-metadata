import express from 'express';
import { movieController } from '../controllers/movieController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, release_date]
 *         description: Sort movies by title or release_date
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter movies by title
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter movies by genre
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           minimum: 1
 *         description: limit results
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '201':
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad Request (e.g., validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.route('/').get(movieController.getAll)
    .post(movieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   patch:
 *     summary: Update a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The movie id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The updated movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: The movie was not found
 *       400:
 *         description: The movie id is not valid
 *       500:
 *         description: Some error happened
 */
router.route('/:id').patch(movieController.updateOne);

export default router;
