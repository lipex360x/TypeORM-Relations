import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Order from '@modules/orders/entities/Order'
import IOrdersRepository from '@modules/orders/repositories/interfaces/IOrdersRepository'
import ICustomersRepository from '@modules/customers/repositories/interfaces/ICustomersRepository'
import IProductsRepository from '@modules/products/repositories/interfaces/IProductsRepository'

interface ProductsProps {
  product_id: string
  quantity: number
}

export interface Request {
  customer_id: string
  products: ProductsProps[]
}

@injectable()
export default class CreateOrderService {
  constructor (
    @inject('OrdersRepository')
    private repository: IOrdersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute ({ customer_id, products }: Request): Promise<Order> {
    // check customer
    const getCustomer = await this.customersRepository.findById({ customer_id })
    if (!getCustomer) throw new AppError('User does not exists')

    // load ids products
    const arrayProductIds = products.map(product => product.product_id)
    const getProducts = await this.productsRepository.findAllById({ arrayProductIds })

    // check products exists
    const arraySizeProducts = getProducts.filter(prod => (prod))
    if (arrayProductIds.length !== arraySizeProducts.length) throw new AppError('One or more products does not exist')

    // check quantity
    const qtdeProducts = getProducts.filter(getProduct => (
      products.filter(product => product.product_id === getProduct.product_id)[0].quantity > getProduct.quantity
    ))
    if (qtdeProducts.length > 0) throw new AppError('One or more products is insufficient for this order')

    // format product
    const formatProducts = products.map(product => ({
      product_id: product.product_id,
      quantity: product.quantity,
      price: getProducts.filter(getProduct => getProduct.product_id === product.product_id)[0].price
    }))

    // create order
    const order = await this.repository.create({ customer: getCustomer, products: formatProducts })

    // update product quantity
    const setProductQtde = formatProducts.map(product => ({
      product_id: product.product_id,
      quantity: getProducts.filter(getProduct => getProduct.product_id === product.product_id)[0].quantity -
        product.quantity
    }))
    await this.productsRepository.updateQuantity({ products: setProductQtde })

    return order
  }
}
