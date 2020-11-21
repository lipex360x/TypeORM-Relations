import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository'
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository'
import ListOrdersService from './ListOrdersService'

let fakeCustomersRepository: FakeCustomersRepository
let fakeProductsRepository: FakeProductsRepository

let fakeRepository: FakeOrdersRepository
let listOrdersService: ListOrdersService

describe('ShowOrder', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository()
    fakeProductsRepository = new FakeProductsRepository()

    fakeRepository = new FakeOrdersRepository()
    listOrdersService = new ListOrdersService(fakeRepository)
  })

  it('should be able to list orders', async () => {
    const customer1 = await fakeCustomersRepository.create({ name: 'john doe', email: 'mail@mail.com' })
    const customer2 = await fakeCustomersRepository.create({ name: 'john tre', email: 'tre@mail.com' })

    const product1 = await fakeProductsRepository.create({ name: 'product1', price: 50, quantity: 5 })
    const product2 = await fakeProductsRepository.create({ name: 'product2', price: 100, quantity: 10 })

    const productArray = [
      { product_id: product1.product_id, quantity: 2 },
      { product_id: product2.product_id, quantity: 5 }
    ]

    await fakeRepository.create({ customer: customer1, products: productArray })
    await fakeRepository.create({ customer: customer2, products: productArray })

    const getOrder = await listOrdersService.execute()

    expect(getOrder).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customer: expect.objectContaining({
            name: 'john doe'
          })
        })
      ])
    )
  })
})
