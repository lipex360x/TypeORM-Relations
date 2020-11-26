import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListCustomersService from '@modules/customers/services/ListCustomers/ListCustomersService'

export default class ListCustomersController {
  async show (request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListCustomersService)

    const listCustomers = await service.execute()

    return response.json(listCustomers)
  }
}
