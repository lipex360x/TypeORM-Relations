import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateCustomerService from '@modules/customers/services/CreateCustomer/CreateCustomerService'

export default class CreateCustomersController {
  async create (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createCustomer = container.resolve(CreateCustomerService)

    const customer = await createCustomer.execute({ name, email, password })

    return response.json(customer)
  }
}
