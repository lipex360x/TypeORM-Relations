import Customer from '@modules/customers/entities/Customer'

export interface SaveProps {
  name: string
  email: string
}

export default interface ICustomersRepository {
  create(data: SaveProps): Promise<Customer>
}
