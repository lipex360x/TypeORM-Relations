import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateOrderService from '@modules/orders/services/CreateOrder/CreateOrderService'

export default class CreateOrderController {
  async create (request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body

    const createOrderService = container.resolve(CreateOrderService)

    const createOrder = await createOrderService.execute({ customer_id, products })

    return response.json(createOrder)
  }
}
