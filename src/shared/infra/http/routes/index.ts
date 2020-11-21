import { Router } from 'express'

import CustomersRouter from '@modules/customers/routes/customers.routes'
import ProductsRouter from '@modules/products/routes/products.routes'
import OrderRouter from '@modules/orders/routes/orders.routes'

const router = Router()

router.use('/customer', CustomersRouter)
router.use('/products', ProductsRouter)
router.use('/orders', OrderRouter)

export default router
