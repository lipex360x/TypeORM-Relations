import { Repository, getRepository } from 'typeorm'

import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import ICustomersRepository, { FindByEmailProps, CreateProps, FindByIdProps } from '@modules/customers/repositories/interfaces/ICustomersRepository'

export default class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>

  constructor () {
    this.repository = getRepository(Customer)
  }

  async create ({ name, email }:CreateProps): Promise<Customer> {
    const customer = this.repository.create({ name, email })

    await this.repository.save(customer)

    return customer
  }

  async findAll (): Promise<Customer[]> {
    return this.repository.find()
  }

  async findByEmail ({ email }:FindByEmailProps): Promise<Customer> {
    const getCustomer = await this.repository.findOne({ where: { email } })

    return getCustomer
  }

  async findById ({ customer_id }:FindByIdProps): Promise<Customer> {
    const getCustomer = await this.repository.findOne({ customer_id })

    return getCustomer
  }
}
