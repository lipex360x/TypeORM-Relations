import { Router } from 'express'

import CreateCustomersController from '../controllers/CreateCustomersController'

const createCustomersController = new CreateCustomersController()

const router = Router()

router.get('/', createCustomersController.create)

export default router
