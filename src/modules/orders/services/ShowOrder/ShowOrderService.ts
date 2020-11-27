import { inject, injectable } from 'tsyringe'

import Order from '@modules/orders/infra/typeorm/entities/Order'
import IOrdersRepository from '@modules/orders/repositories/interfaces/IOrdersRepository'
import AppError from '@shared/errors/AppError'

interface Request{
  order_id: string
}

@injectable()
export default class ShowOrderService {
  constructor (
    @inject('OrdersRepository')
    private repository: IOrdersRepository
  ) {}

  async execute ({ order_id }: Request): Promise<Order> {
    const getOrder = await this.repository.findById({ order_id })
    if (!getOrder) throw new AppError('This order not exists')

    return getOrder
  }
}
