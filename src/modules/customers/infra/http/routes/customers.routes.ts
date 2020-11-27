import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import CreateCustomersController from '../controllers/CreateCustomersController'
import ListCustomersController from '../controllers/ListCustomersController'

const createCustomersController = new CreateCustomersController()
const listCustomersController = new ListCustomersController()

const router = Router()

router.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }
}), createCustomersController.create)

router.get('/', listCustomersController.show)

export default router
