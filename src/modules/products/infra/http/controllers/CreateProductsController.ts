import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateProductsService from '@modules/products/services/CreateProducts/CreateProductsService'

export default class CreateProductsController {
  async create (request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body

    const service = container.resolve(CreateProductsService)

    const createProduct = await service.execute({ name, price, quantity })

    return response.json(createProduct)
  }
}
