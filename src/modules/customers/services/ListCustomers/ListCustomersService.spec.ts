import FakeCustomersRepository from '@modules/customers/repositories/fakes/FakeCustomersRepository'
import ListCustomersService from './ListCustomersService'

let fakeCustomerRepository: FakeCustomersRepository
let listCustomersService: ListCustomersService

describe('TEST_NAME', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository()
    listCustomersService = new ListCustomersService(fakeCustomerRepository)
  })

  it('should be able to list customers', async () => {
    await fakeCustomerRepository.create({ name: 'John Doe', email: 'john@mail.com' })
    await fakeCustomerRepository.create({ name: 'John Tre', email: 'tre@mail.com' })

    const getCustomers = await listCustomersService.execute()

    expect(getCustomers.length).toEqual(2)
  })
})
