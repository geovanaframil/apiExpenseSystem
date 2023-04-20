import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import {IExpense, IExpenseBodyPost} from "../interfaces/expenseInterface";
// import { verifyBody } from "../utils/verifyBodyExpense";
import saveData from "../utils/saveDataJson";

const router = Router();
const Joi = require('joi')
const data = require("../../database/expenses.json");
const expenses: IExpenseBodyPost[] = data;
const users = require("../../database/users.json");

console.log(users);

const postBodyschema = Joi.object({
  name: Joi.string().required(),
  categoryID: Joi.string().required(),
  userID: Joi.string().required(),
  amount: Joi.number().strict().required()
});

function handleBodyExpenseRegister(
  returnAPI: any,
  idExpense: string
): IExpenseBodyPost {
  const newExpense = {
    name: returnAPI.name,
    categoryID: returnAPI.categoryID,
    userID: returnAPI.userID,
    amount: returnAPI.amount,
    status: "PENDENTE",
    id: idExpense,
  };
  return newExpense;
}

router.post("/expenses", (req: Request, res: Response) => {
  const body: IExpenseBodyPost = req.body;
  const { error } = postBodyschema.validate(body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const IdExpense = createIdByExpense(body.name, body.userID);
    const currentExpense = handleBodyExpenseRegister(body, IdExpense);
    expenses.push(currentExpense);
    res.status(200).json({ message: "usuário cadastrado com sucesso" });
    saveData(expenses, "expenses");
  }
});

export default router;