import AppError from '@shared/errors/AppError'
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository'
import CreateProductsService from './CreateProductsService'

let fakeRepository: FakeProductsRepository
let createProductsService: CreateProductsService

describe('CreateProducts', () => {
  beforeEach(() => {
    fakeRepository = new FakeProductsRepository()
    createProductsService = new CreateProductsService(fakeRepository)
  })

  it('should able to create a new product', async () => {
    const product = await createProductsService.execute({
      name: 'Product 1',
      price: 3000,
      quantity: 10
    })

    expect(product).toHaveProperty('product_id')
  })

  it('should not able to create a new product with repeated name', async () => {
    await createProductsService.execute({
      name: 'Product 1',
      price: 3000,
      quantity: 10
    })

    await expect(
      createProductsService.execute({
        name: 'Product 1',
        price: 3000,
        quantity: 10
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
