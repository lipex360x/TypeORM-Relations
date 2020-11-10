import { v4 as uuid } from 'uuid'

import Product from '@modules/products/entities/Product'
import IProductsRepository, { CreateProps, FindByNameProps } from '../interfaces/IProductsRepository'

export default class FakeProductsRepository implements IProductsRepository {
  private repository: Product[] = []

  async create ({ name, price, quantity }:CreateProps): Promise<Product> {
    const product = new Product()

    Object.assign(product, {
      id: uuid(),
      name,
      price,
      quantity,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(product)

    return product
  }

  async findByName ({ name }:FindByNameProps): Promise<Product> {
    const getProduct = this.repository.find(product => product.name === name)

    return getProduct
  }
}
