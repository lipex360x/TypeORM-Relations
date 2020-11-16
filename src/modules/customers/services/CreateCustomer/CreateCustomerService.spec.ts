import AppError from '@shared/errors/AppError'
import FakeCustomersRepository from '../../repositories/fakes/FakeCustomersRepository'
import CreateCustomerService from './CreateCustomerService'

let fakeCustomersRepository: FakeCustomersRepository
let createCustomerService: CreateCustomerService

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomerService = new CreateCustomerService(fakeCustomersRepository)
  })

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com'
    })

    expect(customer).toHaveProperty('customer_id')
  })

  it('should not be able to create a new customer with duplicate email', async () => {
    await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com'
    })

    await expect(
      createCustomerService.execute({
        name: 'John Doe',
        email: 'johndoe@mail.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
