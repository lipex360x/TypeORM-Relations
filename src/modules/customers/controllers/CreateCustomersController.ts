import { Request, Response } from 'express'

export default class CreateCustomersController {
  async create (request: Request, response: Response): Promise<Response> {
    return response.status(200).send('Hello World :)')
  }
}
