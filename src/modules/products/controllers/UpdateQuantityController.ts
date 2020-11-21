import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateQuantityService from '../services/UpdateQuantity/UpdateQuantityService'

export default class UpdateQuantityController {
  async show (request: Request, response: Response): Promise<Response> {
    const products = request.body
    console.log(products)

    const updateQuantityService = container.resolve(UpdateQuantityService)

    const updateQuantity = await updateQuantityService.execute({ products })

    return response.json(updateQuantity)
  }
}
