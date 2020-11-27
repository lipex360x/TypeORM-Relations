import { inject, injectable } from 'tsyringe'
import ICustomersRepository from '@modules/customers/repositories/interfaces/ICustomersRepository'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import AppError from '@shared/errors/AppError'
import IEncryptProvider from '@modules/customers/providers/EncryptProvider/interfaces/IEncryptProvider'

interface Request{
  name: string
  email: string
  password: string
}

@injectable()
export default class CreateCustomerService {
  constructor (
    @inject('CustomersRepository')
    private repository: ICustomersRepository,

    @inject('EncryptProvider')
    private encryptProvider: IEncryptProvider
  ) {}

  async execute ({ name, email, password }: Request): Promise<Customer> {
    const getCustomer = await this.repository.findByEmail({ email })

    if (getCustomer) {
      throw new AppError('This email already exists', 201)
    }

    const hashedPassword = await this.encryptProvider.generate({ password })

    const customer = await this.repository.create({ name, email, password: hashedPassword })

    return customer
  }
}
