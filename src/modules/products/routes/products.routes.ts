import { Router } from 'express'
import CreateProductsController from '../controllers/CreateProductsController'
import ListProductsController from '../controllers/ListProductsController'
import UpdateQuantityController from '../controllers/UpdateQuantityController'

const router = Router()

const createProductsController = new CreateProductsController()
const listProductsController = new ListProductsController()
const updateQuantityController = new UpdateQuantityController()

router.post('/', createProductsController.create)
router.post('/getProducts', listProductsController.index)
router.patch('/', updateQuantityController.show)

export default router
