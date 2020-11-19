import AppError from '@shared/errors/AppError'

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository'
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository'
import CreateOrderService from './CreateOrderService'

let fakeCustomersRepository: FakeCustomersRepository
let fakeProductsRepository: FakeProductsRepository

let fakeRepository: FakeOrdersRepository
let createOrderService: CreateOrderService

describe('TEST_NAME', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeProductsRepository = new FakeProductsRepository()

    fakeRepository = new FakeOrdersRepository()
    createOrderService = new CreateOrderService(fakeRepository, fakeCustomersRepository, fakeProductsRepository)
  })

  it('should be able to create a new order', async () => {
    const customer = await fakeCustomersRepository.create({ name: 'john doe', email: 'mail@mail.com' })
    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })
    const product2 = await fakeProductsRepository.create({ name: 'product2', price: 100, quantity: 10 })

    const productArray = [
      { product_id: product1.product_id, quantity: 2 },
      { product_id: product2.product_id, quantity: 5 }
    ]

    const order = await createOrderService.execute({ customer_id: customer.customer_id, products: productArray })

    expect(order).toEqual(
      expect.objectContaining({

        customer: expect.objectContaining({
          name: 'john doe'
        }),

        order_products: expect.arrayContaining([
          expect.objectContaining({
            quantity: 5
          })
        ])

      })
    )
  })

  it('should not be able to create an order with a invalid customer', async () => {
    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })
    const product2 = await fakeProductsRepository.create({ name: 'product2', price: 100, quantity: 10 })

    const productArray = [
      { product_id: product1.product_id, quantity: 1 },
      { product_id: product2.product_id, quantity: 2 }
    ]

    await expect(
      createOrderService.execute({ customer_id: 'unexisting-customer-id', products: productArray })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an order with invalid products', async () => {
    const customer = await fakeCustomersRepository.create({ name: 'john doe', email: 'mail@mail.com' })
    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })

    const productArray = [
      { product_id: product1.product_id, quantity: 1 },
      { product_id: 'unexsting-product-id', quantity: 2 }
    ]

    await expect(
      createOrderService.execute({ customer_id: customer.customer_id, products: productArray })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an order with products with insufficient quantities', async () => {
    const customer = await fakeCustomersRepository.create({ name: 'john doe', email: 'mail@mail.com' })
    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })
    const product2 = await fakeProductsRepository.create({ name: 'product2', price: 100, quantity: 10 })

    const productArray = [
      { product_id: product1.product_id, quantity: 10 },
      { product_id: product2.product_id, quantity: 2 }
    ]

    await expect(
      createOrderService.execute({ customer_id: customer.customer_id, products: productArray })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to subtract an product total quantity when it is ordered', async () => {
    const customer = await fakeCustomersRepository.create({ name: 'john doe', email: 'mail@mail.com' })
    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })
    const product2 = await fakeProductsRepository.create({ name: 'product2', price: 100, quantity: 10 })

    const productArray = [
      { product_id: product1.product_id, quantity: 2 },
      { product_id: product2.product_id, quantity: 5 }
    ]

    await createOrderService.execute({ customer_id: customer.customer_id, products: productArray })

    const productQtde = await fakeProductsRepository.findByName({ name: 'product1' })

    expect(productQtde.quantity).toBe(3)
  })
})
