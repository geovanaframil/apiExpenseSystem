import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import IExpense from "../interfaces/expenseInterface";
import verifyBody from "../utils/verifyBodyExpense";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";

const router = Router();
const data = readData("expenses");
const expenses: IExpense[] = data;

router.put("/expenses/:expensesID", (req: Request, res: Response) => {
  const id = req.params.expensesID;
  const body = req.body;
  const expenseId = expenses.findIndex((item) => item.id === id);
  if (expenseId === -1) {
    return res
      .status(404)
      .json(`despesa correspondente ao id ${id} não existe`);
  } else {
  }
});

export default router;
