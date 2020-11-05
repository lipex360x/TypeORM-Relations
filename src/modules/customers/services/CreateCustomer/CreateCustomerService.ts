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
    @inject('CustomerRepository')
    private repository: ICustomersRepository
  ) {}

  async execute ({ name, email }: Request): Promise<Customer> {
    const customer = await this.repository.save({ name, email })

    return customer
  }
}
