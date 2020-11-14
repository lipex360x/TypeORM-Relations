import AppError from '@shared/errors/AppError'

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import ListProductsService from './ListProductsService'

let fakeRepository: FakeProductsRepository
let listProductsService: ListProductsService

describe('ListProducts', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductsRepository()
    listProductsService = new ListProductsService(fakeRepository)
  })

  it('should able show a list of products', async () => {
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

    await fakeRepository.create({
      name: 'Prod4',
      price: 400,
      quantity: 40
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

  it('should not able show a list of unexists products', async () => {
    const prod1 = await fakeRepository.create({
      name: 'Prod1',
      price: 100,
      quantity: 10
    })

    const arrayIds = ['id-product-unexistents', prod1.product_id]

    await expect(
      listProductsService.execute({ product_ids: arrayIds })
    ).rejects.toBeInstanceOf(AppError)
  })
})
