import { container } from 'tsyringe'

import IProductsRepository from './interfaces/IProductsRepository'
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository'

const providers = {
  typeorm: ProductsRepository
}

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  providers.typeorm
)
