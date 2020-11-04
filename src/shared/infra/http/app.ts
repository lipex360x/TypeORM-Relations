import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'

import connectDB from '@shared/infra/typeorm'
connectDB()

const app = express()
app.use(express.json())

export default app
