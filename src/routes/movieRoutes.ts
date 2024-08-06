import express from 'express'
import { movieController } from '../controllers/movieController'



const router = express.Router()

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
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: The list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 * 
 */
router.route('/')
.get(movieController.getAll)

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
 *           type: integer
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
 *       500:
 *         description: Some error happened
 * 400:
 *         description: invalid input
 *
 */
router.route('/:id')
.patch(movieController.updateOne)


export default router