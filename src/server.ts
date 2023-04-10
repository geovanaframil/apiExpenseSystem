import express from 'express'
import get from '../src/get/get'

const app = express()
app.use(express.json())


app.use(get)
app.listen(3000, () => 'server is running in port 3000')