import { Router } from 'express'

import CreateOrderController from '../controllers/CreateOrderController'
import ShowOrderController from '../controllers/ShowOrderController'
import ListOrdersController from '../controllers/ListOrdersController'

const router = Router()

const createOrderController = new CreateOrderController()
const showOrderController = new ShowOrderController()
const listOrdersController = new ListOrdersController()

router.post('/', createOrderController.create)

router.get('/', listOrdersController.show)
router.get('/:order_id', showOrderController.show)

export default router
