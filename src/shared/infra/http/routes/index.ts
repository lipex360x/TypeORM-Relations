import { Router } from 'express'

import CustomersRouter from '@modules/customers/infra/http/routes/customers.routes'
import ProductsRouter from '@modules/products/infra/http/routes/products.routes'
import OrderRouter from '@modules/orders/infra/http/routes/orders.routes'

const router = Router()

router.use('/customers', CustomersRouter)
router.use('/products', ProductsRouter)
router.use('/orders', OrderRouter)

export default router
