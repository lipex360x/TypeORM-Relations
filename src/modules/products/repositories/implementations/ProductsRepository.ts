import { Repository, getRepository, In } from 'typeorm'

import Product from '@modules/products/entities/Product'
import IProductsRepository, { CreateProps, FindByNameProps, FindAllByIdProps, UpdateQuantityProps } from '../interfaces/IProductsRepository'

export default class FakeProductsRepository implements IProductsRepository {
  private repository: Repository<Product>

  constructor () {
    this.repository = getRepository(Product)
  }

  async create ({ name, price, quantity }:CreateProps): Promise<Product> {
    const product = this.repository.create({ name, price, quantity })

    await this.repository.save(product)

    return product
  }

  async findByName ({ name }:FindByNameProps): Promise<Product> {
    const getProduct = await this.repository.findOne({ where: { name } })

    return getProduct
  }

  async findAllById ({ arrayProductIds }:FindAllByIdProps): Promise<Product[]> {
    const getProducts = await this.repository.find({
      where: {
        id: In(arrayProductIds)
      }
    })

    return getProducts
  }

  async updateQuantity ({ products }:UpdateQuantityProps): Promise<Product[]> {
    return this.repository.save(products)
  }
}
