import express from 'express'
import { movieController } from '../controllers/movieController'

const router = express.Router()

router.route('/')
.get(movieController.getAll)

router.route('/:id')
.patch(movieController.updateOne)


export default router