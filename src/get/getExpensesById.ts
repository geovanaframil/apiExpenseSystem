import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import readData from "../utils/readDataJson";

const router = Router();
const data = readData("expenses");
const expenses: IExpense[] = data;

router.get("/expenses/:expenseID", (req: Request, res: Response) => {
  const id = req.params.expenseID;
  const expenseId = expenses.find((item) => item.id === id);
  if (expenseId) {
    return res.status(200).json(expenseId);
  } else {
    res.status(404).json(`Despesa correspondente ao id ${id} não existe`);
  }
});

export default router;
