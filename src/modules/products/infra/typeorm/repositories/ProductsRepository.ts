import { Repository, getRepository, In } from 'typeorm'

import Product from '@modules/products/infra/typeorm/entities/Product'
import IProductsRepository, { CreateProps, FindByNameProps, FindAllByIdProps, UpdateQuantityProps } from '@modules/products/repositories/interfaces/IProductsRepository'

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

  async findAll (): Promise<Product[]> {
    const getProducts = await this.repository.find()

    return getProducts
  }

  async findByName ({ name }:FindByNameProps): Promise<Product> {
    const getProduct = await this.repository.findOne({ where: { name } })

    return getProduct
  }

  async findAllById ({ arrayProductIds }:FindAllByIdProps): Promise<Product[]> {
    const getProducts = await this.repository.find({
      where: {
        product_id: In(arrayProductIds)
      }
    })

    return getProducts
  }

  async updateQuantity ({ products }:UpdateQuantityProps): Promise<Product[]> {
    return this.repository.save(products)
  }
}
