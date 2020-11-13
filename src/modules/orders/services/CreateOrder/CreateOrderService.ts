import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Order from '@modules/orders/entities/Order'
import IOrdersRepository from '@modules/orders/repositories/interfaces/IOrdersRepository'

type ProductsProps = Array <{
  product_id: string
  quantity: number
}>

export interface Request {
  customer_id: string
  products: ProductsProps
}

@injectable()
export default class CreateOrderService {
  constructor (
    @inject('OrdersRepository')
    private repository: IOrdersRepository
  ) {}

  async execute ({ customer_id, products }: Request): Promise<void> {
    // const repoFunctions = await this.repository.function()

  }
}
