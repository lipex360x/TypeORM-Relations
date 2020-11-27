import { v4 as uuid } from 'uuid'

import Product from '@modules/products/infra/typeorm/entities/Product'
import IProductsRepository, { CreateProps, FindByNameProps, FindAllByIdProps, UpdateQuantityProps } from '../interfaces/IProductsRepository'

export default class FakeProductsRepository implements IProductsRepository {
  private repository: Product[] = []

  async create ({ name, price, quantity }:CreateProps): Promise<Product> {
    const product = new Product()

    Object.assign(product, {
      product_id: uuid(),
      name,
      price,
      quantity,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.repository.push(product)

    return product
  }

  async findAll (): Promise<Product[]> {
    return this.repository
  }

  async findByName ({ name }:FindByNameProps): Promise<Product> {
    const getProduct = this.repository.find(product => product.name === name)

    return getProduct
  }

  async findAllById ({ arrayProductIds }:FindAllByIdProps): Promise<Product[]> {
    const getProducts = arrayProductIds.map(product_id => (
      this.repository.find(prod => prod.product_id === product_id)
    ))

    return getProducts
  }

  async updateQuantity ({ products }:UpdateQuantityProps): Promise<Product[]> {
    products.map(product => {
      const getIndex = this.repository.findIndex(prod => prod.product_id === product.product_id)
      const setProd = this.repository[getIndex].quantity = product.quantity
      return setProd
    })

    return this.repository
  }
}
