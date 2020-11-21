import { v4 as uuid } from 'uuid'
import Customer from '@modules/customers/entities/Customer'
import ICustomersRepository, { FindByEmailProps, CreateProps, FindByIdProps } from '../interfaces/ICustomersRepository'

export default class FakeCustomersRepository implements ICustomersRepository {
  private repository: Customer[] = []

  async create ({ name, email }:CreateProps): Promise<Customer> {
    const customer = new Customer()

    Object.assign(customer, {
      customer_id: uuid(),
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(customer)

    return customer
  }

  async findAll (): Promise<Customer[]> {
    return this.repository
  }

  async findByEmail ({ email }:FindByEmailProps): Promise<Customer> {
    const getCustomer = this.repository.find(customer => customer.email === email)

    return getCustomer
  }

  async findById ({ customer_id }:FindByIdProps): Promise<Customer> {
    const getCustomer = this.repository.find(customer => customer.customer_id === customer_id)

    return getCustomer
  }
}
