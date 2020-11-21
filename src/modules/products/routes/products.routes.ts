import { Router } from 'express'
import CreateProductsController from '../controllers/CreateProductsController'
import ListProductsController from '../controllers/ListProductsController'

const router = Router()

const createProductsController = new CreateProductsController()
const listProductsController = new ListProductsController()

router.post('/', createProductsController.create)
router.post('/getProducts', listProductsController.index)

export default router
