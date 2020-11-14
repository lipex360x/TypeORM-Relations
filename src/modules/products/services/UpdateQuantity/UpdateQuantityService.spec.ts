// import AppError from '@shared/errors/AppError'

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import UpdateQuantityService from './UpdateQuantityService'

let fakeRepository: FakeProductsRepository
let updateQuantityService: UpdateQuantityService

describe('UpdateQuantity', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductsRepository()
    updateQuantityService = new UpdateQuantityService(fakeRepository)
  })

  it('should able to update a list of products', async () => {
    const product1 = await fakeRepository.create({
      name: 'Prod1',
      price: 100,
      quantity: 10
    })

    const product2 = await fakeRepository.create({
      name: 'Prod2',
      price: 200,
      quantity: 20
    })

    await fakeRepository.create({
      name: 'Prod3',
      price: 300,
      quantity: 500
    })

    const setProducts = [
      {
        product_id: product1.product_id,
        quantity: 50
      },
      {
        product_id: product2.product_id,
        quantity: 100
      }
    ]

    const setListProducts = await updateQuantityService.execute({ products: setProducts })

    expect(setListProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Prod1',
          quantity: 50
        }),
        expect.objectContaining({
          name: 'Prod2',
          quantity: 100
        }),
        expect.objectContaining({
          name: 'Prod3',
          quantity: 500
        })
      ])
    )
  })
})
