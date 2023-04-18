import express from 'express'
import postUser from './post/postUser'
import getUser from './get/getUser'
import putUser from './put/putUser'
import deleteUser from './delete/deleteUser'
import getUserById from './get/getUserId'

const app = express()
app.use(express.json())


app.use(postUser)
app.use(getUser)
app.use(putUser)
app.use(deleteUser)
app.use(getUserById)
app.listen(3000, () => 'server is running in port 3000')