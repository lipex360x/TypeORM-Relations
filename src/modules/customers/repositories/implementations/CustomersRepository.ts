import { Repository, getRepository } from 'typeorm'

import Customer from '@modules/customers/entities/Customer'
import ICustomersRepository, { FindByEmailProps, SaveProps } from '../interfaces/ICustomersRepository'

export default class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>

  constructor () {
    this.repository = getRepository(Customer)
  }

  async create ({ name, email }:SaveProps): Promise<Customer> {
    const customer = this.repository.create({ name, email })

    await this.repository.save(customer)

    return customer
  }

  async findByEmail ({ email }:FindByEmailProps): Promise<Customer> {
    const getCustomer = await this.repository.findOne({ where: { email } })

    return getCustomer
  }
}
