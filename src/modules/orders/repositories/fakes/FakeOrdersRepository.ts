import { v4 as uuid } from 'uuid'

import Order from '@modules/orders/entities/Order'
import IOrdersRepository, { CreateProps, FindByIdProps } from '../interfaces/IOrdersRepository'

export default class FakeOrdersRepository implements IOrdersRepository {
  private repository: Order[] = []

  async create ({ customer, products }:CreateProps): Promise<Order> {
    const order = new Order()

    Object.assign(order, {
      order_id: uuid(),
      customer,
      order_products: products,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(order)

    return order
  }

  async findById ({ order_id }:FindByIdProps): Promise<Order> {
    const getOrder = this.repository.find(order => order.order_id === order_id)

    return getOrder
  }
}
