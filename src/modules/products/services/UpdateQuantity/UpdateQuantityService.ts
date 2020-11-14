import { inject, injectable } from 'tsyringe'

import Product from '@modules/products/entities/Product'
import IProductsRepository from '@modules/products/repositories/interfaces/IProductsRepository'
import AppError from '@shared/errors/AppError'

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
    const productsIds = products.map(product => (product.product_id))

    const getProducts = await this.repository.findAllById({ arrayProductIds: productsIds })

    getProducts.map(product => {
      if (!product) {
        throw new AppError('Products not found')
      }
      return product
    })

    const setProducts = await this.repository.updateQuantity({ products })

    return setProducts
  }
}
