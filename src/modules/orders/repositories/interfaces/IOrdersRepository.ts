import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import Order from '@modules/orders/infra/typeorm/entities/Order'

interface ProductsProps {
  product_id: string
  quantity: number
}

export interface CreateProps {
  customer: Customer
  products: ProductsProps[]
}

export interface FindByIdProps {
  order_id: string
}

export default interface IOrdersRepository {
  create(data: CreateProps): Promise<Order>
  findAll(): Promise<Order[]>
  findById(data: FindByIdProps): Promise<Order>
}
