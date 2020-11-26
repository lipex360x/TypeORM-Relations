import { container } from 'tsyringe'

import ICustomersRepository from './interfaces/ICustomersRepository'
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository'

const providers = {
  typeorm: CustomersRepository
}

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  providers.typeorm
)
