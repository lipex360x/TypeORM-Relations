import { Router } from 'express'

import CreateProductsController from '../controllers/CreateProductsController'
import ListProductsController from '../controllers/ListProductsController'
import ListProductsByIdController from '../controllers/ListProductsByIdController'
import UpdateQuantityController from '../controllers/UpdateQuantityController'

const router = Router()

const createProductsController = new CreateProductsController()
const listProductsController = new ListProductsController()
const listProductsByIdController = new ListProductsByIdController()
const updateQuantityController = new UpdateQuantityController()

router.post('/', createProductsController.create)
router.get('/', listProductsController.index)
router.post('/listProductsById', listProductsByIdController.index)
router.patch('/', updateQuantityController.show)

export default router
