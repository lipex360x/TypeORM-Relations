import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateCustomerService from '../services/CreateCustomer/CreateCustomerService'

export default class CreateCustomersController {
  async create (request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const createCustomer = container.resolve(CreateCustomerService)

    const customer = await createCustomer.execute({ name, email })

    return response.json(customer)
  }
}
