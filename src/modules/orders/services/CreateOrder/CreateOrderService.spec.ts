import AppError from '@shared/errors/AppError'
import FakeOrdersRepository from '@modules/orders/repositories/fakes/FakeOrdersRepository'
import CreateOrderService from './CreateOrderService'

let fakeRepository: FakeOrdersRepository
let createOrderService: CreateOrderService

describe('TEST_NAME', () => {
  beforeEach(() => {
    fakeRepository = new FakeOrdersRepository()
    createOrderService = new CreateOrderService(fakeRepository)
  })

  it('should ...', async () => {
    await expect(1 + 1).toBe(2)
  })
})
