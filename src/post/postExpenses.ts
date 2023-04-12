import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import IExpense from "../interfaces/expenseInterface";

const router = Router();

function handleBodyExpenseRegister(
  returnAPI: any,
  idExpense: string
): IExpense {
  const newExpense = {
    name: returnAPI.name,
    categoryID: returnAPI.categoryID,
    userID: returnAPI.userID,
    amount: returnAPI.amount,
    id: idExpense,
  };
  return newExpense;
}

router.post("/expenses", (req: Request, res: Response) => {
  const body = req.body;
});
