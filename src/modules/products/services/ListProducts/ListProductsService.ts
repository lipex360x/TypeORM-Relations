import { inject, injectable } from 'tsyringe'

import Product from '@modules/products/entities/Product'
import IProductsRepository from '@modules/products/repositories/interfaces/IProductsRepository'

interface Request{
  product_ids: string[]
}

@injectable()
export default class ListProductsService {
  constructor (
    @inject('ProductsRepository')
    private repository: IProductsRepository
  ) {}

  async execute ({ product_ids }: Request): Promise<Product[]> {
    const getProducts = await this.repository.findAllById({ arrayProductIds: product_ids })

    return getProducts
  }
}
