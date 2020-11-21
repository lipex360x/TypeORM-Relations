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
    await fakeRepository.create({
      name: 'Prod1',
      price: 100,
      quantity: 10
    })

    await fakeRepository.create({
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

    const getProducts = await listProductsService.execute()

    expect(getProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Prod1'
        }),
        expect.objectContaining({
          name: 'Prod2'
        }),
        expect.objectContaining({
          name: 'Prod3'
        }),
        expect.objectContaining({
          name: 'Prod4'
        })
      ])
    )
  })
})
