import { inject, injectable } from 'tsyringe'

import Customer from '@modules/customers/entities/Customer'
import ICustomersRepository from '@modules/customers/repositories/interfaces/ICustomersRepository'

@injectable()
export default class ListCustomersService {
  constructor (
    @inject('CustomersRepository')
    private repository: ICustomersRepository
  ) {}

  async execute (): Promise<Customer[]> {
    return this.repository.findAll()
  }
}
