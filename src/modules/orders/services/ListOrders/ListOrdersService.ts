import { inject, injectable } from 'tsyringe'

import Order from '@modules/orders/entities/Order'
import IOrdersRepository from '@modules/orders/repositories/interfaces/IOrdersRepository'

@injectable()
export default class ShowOrderService {
  constructor (
    @inject('OrdersRepository')
    private repository: IOrdersRepository
  ) {}

  async execute (): Promise<Order[]> {
    return this.repository.findAll()
  }
}
