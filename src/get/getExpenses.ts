import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import readData from "../utils/readDataJson";

const router = Router();
let expenses: IExpense[];

async function initializeExpenses() {
  const data = await readData("expenses");
  expenses = data as IExpense[];
}

initializeExpenses();

router.get("/expenses", (req: Request, res: Response) => {
  if (expenses.length !== 0) {
    res.status(200).json(expenses);
  } else {
    res.status(204).json();
  }
});

export default router;
