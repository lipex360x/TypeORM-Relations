import { Router } from 'express'

import CreateOrderController from '@modules/orders/infra/http/controllers/CreateOrderController'
import ShowOrderController from '@modules/orders/infra/http/controllers/ShowOrderController'
import ListOrdersController from '@modules/orders/infra/http/controllers/ListOrdersController'

const router = Router()

const createOrderController = new CreateOrderController()
const showOrderController = new ShowOrderController()
const listOrdersController = new ListOrdersController()

router.post('/', createOrderController.create)

router.get('/', listOrdersController.show)
router.get('/:order_id', showOrderController.show)

export default router
