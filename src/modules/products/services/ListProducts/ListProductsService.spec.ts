// import AppError from '@shared/errors/AppError'

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import ListProductsService from './ListProductsService'

let fakeRepository: FakeProductsRepository
let listProductsService: ListProductsService

describe('UpdateQuantity', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductsRepository()
    listProductsService = new ListProductsService(fakeRepository)
  })

  it('should able update a list of products', async () => {
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
      quantity: 30
    })

    const arrayIds = [product1.product_id, product2.product_id]

    const getProducts = await listProductsService.execute({ product_ids: arrayIds })

    expect(getProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Prod1'
        }),
        expect.objectContaining({
          name: 'Prod2'
        })
      ])
    )
  })
})
