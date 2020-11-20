import AppError from '@shared/errors/AppError'

import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository'
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository'
import ShowOrderService from './ShowOrderService'

let fakeCustomersRepository: FakeCustomersRepository
let fakeProductsRepository: FakeProductsRepository

let fakeRepository: FakeOrdersRepository
let showOrderService: ShowOrderService

describe('ShowOrder', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeProductsRepository = new FakeProductsRepository()

    fakeRepository = new FakeOrdersRepository()
    showOrderService = new ShowOrderService(fakeRepository)
  })

  it('should be able to list a order', async () => {
    const customer = await fakeCustomersRepository.create({ name: 'john doe', email: 'mail@mail.com' })
    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })
    const product2 = await fakeProductsRepository.create({ name: 'product2', price: 100, quantity: 10 })

    const productArray = [
      { product_id: product1.product_id, quantity: 2 },
      { product_id: product2.product_id, quantity: 5 }
    ]

    const setOrder = await fakeRepository.create({ customer, products: productArray })

    const getOrder = await showOrderService.execute({ order_id: setOrder.order_id })

    expect(getOrder).toHaveProperty('order_id')
  })

  it('should not be able to list a non existent order', async () => {
    await expect(
      showOrderService.execute({ order_id: 'non-existent-order' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
