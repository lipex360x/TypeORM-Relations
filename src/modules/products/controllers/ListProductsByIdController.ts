import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProductsById from '../services/ListProductsById/ListProductsByIdService'

export default class ListProductsByIdController {
  async index (request: Request, response: Response): Promise<Response> {
    const { productsIds } = request.body

    const service = container.resolve(ListProductsById)

    const listProductsById = await service.execute({ product_ids: productsIds })

    return response.json(listProductsById)
  }
}
