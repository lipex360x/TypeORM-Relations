import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProductsService from '../services/ListProducts/ListProductsService'

export default class ListProductsController {
  async index (request: Request, response: Response): Promise<Response> {
    const { productsIds } = request.body
    console.log(productsIds)
    const service = container.resolve(ListProductsService)

    const listProducts = await service.execute({ product_ids: productsIds })

    return response.json(listProducts)
  }
}
