import { Router } from 'express'

import CreateCustomersController from '../controllers/CreateCustomersController'

const createCustomersController = new CreateCustomersController()

const router = Router()

router.post('/', createCustomersController.create)

export default router
