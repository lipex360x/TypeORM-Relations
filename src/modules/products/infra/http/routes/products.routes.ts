import { Router } from 'express'

import CreateProductsController from '@modules/products/infra/http/controllers/CreateProductsController'
import ListProductsController from '@modules/products/infra/http/controllers/ListProductsController'
import ListProductsByIdController from '@modules/products/infra/http/controllers/ListProductsByIdController'
import UpdateQuantityController from '@modules/products/infra/http/controllers/UpdateQuantityController'

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
