import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProductsService from '../services/ListProducts/ListProductsService'

export default class ListProductsController {
  async index (request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListProductsService)

    const listProducts = await service.execute()

    return response.json(listProducts)
  }
}
