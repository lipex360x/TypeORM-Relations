import Customer from '@modules/customers/entities/Customer'

export interface SaveProps {
  name: string
  email: string
}

export default interface ICustomersRepository {
  save(data: SaveProps): Promise<Customer>
}
