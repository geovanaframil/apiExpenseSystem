import { Router, Request, Response } from "express";

const router = Router();

router.get("/expenses", (req: Request, res: Response) => {
  res.json("Server is running!");
});

export default router;
