import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'

import routes from '@shared/infra/http/routes'

import connectDB from '@shared/infra/typeorm'
connectDB()

const app = express()
app.use(express.json())
app.use(routes)

export default app
