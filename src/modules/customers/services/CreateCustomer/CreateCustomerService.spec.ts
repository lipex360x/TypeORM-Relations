import AppError from '@shared/errors/AppError'
import FakeEncryptProvider from '@modules/customers/providers/EncryptProvider/fakes/FakeEncryptProvider'
import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository'
import CreateCustomerService from './CreateCustomerService'

let fakeEncryptProvider: FakeEncryptProvider
let fakeCustomersRepository: FakeCustomersRepository
let createCustomerService: CreateCustomerService

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeEncryptProvider = new FakeEncryptProvider()
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomerService = new CreateCustomerService(fakeCustomersRepository, fakeEncryptProvider)
  })

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234'
    })

    expect(customer).toHaveProperty('customer_id')
  })

  it('should not be able to create a new customer with duplicate email', async () => {
    await createCustomerService.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '1234'
    })

    await expect(
      createCustomerService.execute({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
