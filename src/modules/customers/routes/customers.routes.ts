import { Router } from 'express'

import CreateCustomersController from '../controllers/CreateCustomersController'
import ListCustomersController from '../controllers/ListCustomersController'

const createCustomersController = new CreateCustomersController()
const listCustomersController = new ListCustomersController()

const router = Router()

router.post('/', createCustomersController.create)
router.get('/', listCustomersController.show)

export default router
