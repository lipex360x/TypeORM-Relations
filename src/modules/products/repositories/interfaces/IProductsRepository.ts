import Product from '@modules/products/entities/Product'

export interface CreateProps {
  name: string
  quantity: number
  price: number
}

export interface FindByNameProps {
  name: string
}

export default interface IProductsRepository {
  create(data: CreateProps): Promise<Product>
  findByName(data: FindByNameProps): Promise<Product>
}
