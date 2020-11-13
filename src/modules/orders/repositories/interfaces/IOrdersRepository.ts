import Order from '@modules/orders/entities/Order'
type ProductsProps = Array <{
  product_id: string
  quantity: number
}>

export interface CreateProps {
  customer_id: string
  products: ProductsProps
}

export interface FindByIdProps {
  order_id: string
}

export default interface IOrdersRepository {
  create(data: CreateProps): Promise<Order>
  findById(data: FindByIdProps): Promise<Order>
}
