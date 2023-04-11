import express from 'express'
import postUser from './post/postUser'

const app = express()
app.use(express.json())


app.use(postUser)
app.listen(3000, () => 'server is running in port 3000')