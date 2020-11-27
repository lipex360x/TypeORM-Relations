import Product from '@modules/products/infra/typeorm/entities/Product'

export interface CreateProps {
  name: string
  quantity: number
  price: number
}

export interface FindByNameProps {
  name: string
}

export interface FindAllByIdProps {
  arrayProductIds: string[]
}

interface ProductsUpdate {
  product_id: string
  quantity: number
}

export interface UpdateQuantityProps {
  products: ProductsUpdate[]
}

export default interface IProductsRepository {
  create(data: CreateProps): Promise<Product>
  findAll(): Promise<Product[]>
  findByName(data: FindByNameProps): Promise<Product>
  findAllById(data: FindAllByIdProps): Promise<Product[]>
  updateQuantity(data: UpdateQuantityProps): Promise<Product[]>
}
