import { Router, Request, Response } from "express";

const router = Router()

router.get('/', (req:Request, res:Response) => {
    res.json('Server is running!')
})

export default router