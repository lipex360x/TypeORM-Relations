import { container } from 'tsyringe'

import IProductsRepository from './interfaces/IProductsRepository'
import ProductsRepository from './implementations/ProductsRepository'

const providers = {
  postgres: ProductsRepository
}

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  providers.postgres
)
