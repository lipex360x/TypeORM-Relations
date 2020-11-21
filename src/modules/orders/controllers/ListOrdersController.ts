import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListOrdersService from '../services/ListOrders/ListOrdersService'

export default class ListOrdersController {
  async show (request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListOrdersService)

    const listOrders = await service.execute()

    return response.json(listOrders)
  }
}
