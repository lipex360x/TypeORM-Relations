import { Repository, getRepository } from 'typeorm'

import Order from '@modules/orders/entities/Order'
import IOrdersRepository, { CreateProps, FindByIdProps } from '../interfaces/IOrdersRepository'

export default class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>

  constructor () {
    this.repository = getRepository(Order)
  }

  async create ({ customer, products }:CreateProps): Promise<Order> {
    const order = this.repository.create({ customer, order_products: products })

    await this.repository.save(order)

    return order
  }

  async findAll (): Promise<Order[]> {
    return this.repository.find()
  }

  async findById ({ order_id }:FindByIdProps): Promise<Order> {
    const getOrder = await this.repository.findOne(order_id, {
      relations: ['order_products', 'customer']
    })

    return getOrder
  }
}
