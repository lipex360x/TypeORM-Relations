import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ShowOrderService from '@modules/orders/services/ShowOrder/ShowOrderService'

export default class ShowOrderController {
  async show (request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params

    const service = container.resolve(ShowOrderService)

    const showOrderService = await service.execute({ order_id })

    return response.json(showOrderService)
  }
}
