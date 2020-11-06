import { container } from 'tsyringe'

import ICustomersRepository from './interfaces/ICustomersRepository'
import CustomersRepository from './implementations/CustomersRepository'

const providers = {
  postgres: CustomersRepository
}

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  providers.postgres
)
