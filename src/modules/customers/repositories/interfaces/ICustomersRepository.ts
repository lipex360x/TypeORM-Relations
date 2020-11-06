import Customer from '@modules/customers/entities/Customer'

export interface CreateProps {
  name: string
  email: string
}

export interface FindByEmailProps {
  email: string
}

export default interface ICustomersRepository {
  create(data: CreateProps): Promise<Customer>
  findByEmail(data: FindByEmailProps): Promise<Customer>
}
