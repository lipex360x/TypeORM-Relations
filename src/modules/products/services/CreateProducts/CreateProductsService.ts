import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError'

import Product from '@modules/products/entities/Product'
import IProductsRepository from '@modules/products/repositories/interfaces/IProductsRepository'
import AppError from '@shared/errors/AppError'

interface Request{
  name: string
  price: number
  quantity: number
}

@injectable()
export default class CreateProductsService {
  constructor (
    @inject('ProductsRepository')
    private repository: IProductsRepository
  ) {}

  async execute ({ name, price, quantity }: Request): Promise<Product> {
    const getProduct = await this.repository.findByName({ name })

    if (getProduct) {
      throw new AppError('Product is alredy exists')
    }

    const product = await this.repository.create({ name, price, quantity })

    return product
  }
}
