import { v4 as uuid } from 'uuid'
import Customer from '@modules/customers/entities/Customer'
import ICustomersRepository, { SaveProps } from '../interfaces/ICustomersRepository'

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = []

  async save ({ name, email }:SaveProps): Promise<Customer> {
    const customer = new Customer()

    Object.assign(customer, {
      id: uuid(),
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.customers.push(customer)

    return customer
  }
}
