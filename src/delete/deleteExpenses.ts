import { Router, Request, Response } from "express";
import IExpense from "../interfaces/expenseInterface";
import saveData from "../utils/saveDataJson";

const router = Router();
const data = require("../../database/expenses.json");
const expenses: IExpense[] = data;

router.delete("/expenses/:expenseID", (req: Request, res: Response) => {
  const id = req.params.expenseID;
  const expenseId = expenses.find((item) => item.id === id);
  if (expenseId) {
    let expenseObject = expenses.filter((item) => item.id !== id);

    res.status(200).json("despeza removido com sucesso");

    saveData(expenseObject, "expenses");

    return res.status(200).json(expenseId);
  } else {
    res.status(404).json(`Despesa correspondente ao id ${id} não existe`);
  }
});

export default router;
