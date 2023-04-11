import express from 'express'
import get from '../src/get/get'
import getExpenses from '../src/get/getExpenses'

const app = express()
app.use(express.json())


app.use(get)
app.use(getExpenses)
app.listen(3000, () => 'server is running in port 3000')