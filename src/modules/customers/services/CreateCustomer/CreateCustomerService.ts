import { inject, injectable } from 'tsyringe'
import ICustomersRepository from '@modules/customers/repositories/interfaces/ICustomersRepository'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import AppError from '@shared/errors/AppError'

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
    const getCustomer = await this.repository.findByEmail({ email })

    if (getCustomer) {
      throw new AppError('This email already exists', 201)
    }
    const customer = await this.repository.create({ name, email })

    return customer
  }
}
