const { Router } = require('express')
const staffsRoutes = require('./staffs.routes')
const customersRoutes = require('./customers.routes')
const categoriesRoutes = require('./categories.routes')
const brandsRoutes = require('./brands.routes')
const reviewsRoutes = require('./reviews.routes')
const ordersRoutes = require('./orders.routes')

const { adminOnly } = require('@/library/middlewares')
const productRoutes = require('./products.routes')

const router = Router()

router.use('/staffs', adminOnly, staffsRoutes)

router.use('/customers', customersRoutes)

router.use('/categories', categoriesRoutes)

router.use('/brands', brandsRoutes)

router.use('/products', productRoutes)

router.use('/reviews', reviewsRoutes)

router.use('/orders', ordersRoutes)









module.exports = router