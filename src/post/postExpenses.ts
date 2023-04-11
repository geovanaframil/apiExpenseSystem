import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";

const router = Router();

router.post("/expenses", (req: Request, res: Response) => {
  const body = req.body;
});
