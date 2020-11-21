import { Router } from 'express'
import CreateProductsController from '../controllers/CreateProductsController'

const router = Router()

const createProductsController = new CreateProductsController()

router.post('/', createProductsController.create)

export default router
