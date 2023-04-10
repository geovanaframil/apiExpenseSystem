import express from 'express'
import {Router, Request, Response } from 'express'

const app = express()
const router = Router()
app.use(express.json())


router.get('/', (req:Request, res:Response) => {
    res.json('Server is running!')
})


app.use(router)
app.listen(3000, () => 'server is running in port 3000')