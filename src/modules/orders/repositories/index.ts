import { container } from 'tsyringe'

import IOrdersRepository from './interfaces/IOrdersRepository'
import OrdersRepository from './implementations/OrdersRepository'

const providers = {
  postgres: OrdersRepository
}

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  providers.postgres
)
