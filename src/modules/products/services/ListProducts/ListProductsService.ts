import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError'

import Product from '@modules/products/entities/Product'
import IProductsRepository from '@modules/products/repositories/interfaces/IProductsRepository'

@injectable()
export default class ListProductsService {
  constructor (
    @inject('ProductsRepository')
    private repository: IProductsRepository
  ) {}

  async execute (): Promise<Product[]> {
    return this.repository.findAll()
  }
}
