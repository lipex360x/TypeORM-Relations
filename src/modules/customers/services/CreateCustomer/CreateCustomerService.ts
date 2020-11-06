import { inject, injectable } from 'tsyringe'
import ICustomersRepository from '@modules/customers/repositories/interfaces/ICustomersRepository'
import Customer from '@modules/customers/entities/Customer'

interface Request{
  name: string
  email: string
}

@injectable()
export default class CreateCustomerService {
  constructor (
    @inject('CustomersRepository')
    private repository: ICustomersRepository
  ) {}

  async execute ({ name, email }: Request): Promise<Customer> {
    const customer = await this.repository.create({ name, email })

    return customer
  }
}
