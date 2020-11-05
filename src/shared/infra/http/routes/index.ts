import { Router } from 'express'

import CustomersRouter from '@modules/customers/routes/customers.routes'

const router = Router()

router.use('/customer', CustomersRouter)

export default router
