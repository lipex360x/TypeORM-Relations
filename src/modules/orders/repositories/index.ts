import { container } from 'tsyringe'

import IOrdersRepository from './interfaces/IOrdersRepository'
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository'

const providers = {
  typeorm: OrdersRepository
}

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  providers.typeorm
)
