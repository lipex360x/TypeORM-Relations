import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateCustomerService from '@modules/customers/services/CreateCustomer/CreateCustomerService'
import { classToClass } from 'class-transformer'

export default class CreateCustomersController {
  async create (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createCustomer = container.resolve(CreateCustomerService)

    const customer = await createCustomer.execute({ name, email, password })

    return response.json(classToClass(customer))
  }
}
