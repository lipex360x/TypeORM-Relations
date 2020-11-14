import { inject, injectable } from 'tsyringe'

import Product from '@modules/products/entities/Product'
import IProductsRepository from '@modules/products/repositories/interfaces/IProductsRepository'

interface ProductsUpdate {
  product_id: string
  quantity: number
}

interface Request{
  products: ProductsUpdate[]
}

@injectable()
export default class UpdateQuantityService {
  constructor (
    @inject('ProductsRepository')
    private repository: IProductsRepository
  ) {}

  async execute ({ products }: Request): Promise<Product[]> {
    // Search products
    const setProducts = await this.repository.updateQuantity({ products })

    return setProducts
  }
}
