import { Router } from 'express'

import CustomersRouter from '@modules/customers/routes/customers.routes'
import ProductsRouter from '@modules/products/routes/products.routes'

const router = Router()

router.use('/customer', CustomersRouter)
router.use('/products', ProductsRouter)

export default router
