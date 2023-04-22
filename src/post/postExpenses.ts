import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import {
  IExpense,
  IExpenseBodyPost,
  IExpenseByUser,
} from "../interfaces/expenseInterface";
import postBodySchema from "../utils/verifyBodyExpense";
import saveData from "../utils/saveDataJson";
import ICategory from "../interfaces/categoryInterface";
import User from "../interfaces/userInterface";

const router = Router();

const expensesData = require("../../database/expenses.json");
const usersData = require("../../database/users.json");
const categoriesData = require("../../database/categories.json");

console.log(usersData);

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
  const expenses: IExpense[] = expensesData;
  const categories: ICategory[] = categoriesData;
  const users: User[] = usersData;
  const body: IExpenseBodyPost = req.body;
  const { error } = postBodySchema.validate(body);
  if (error) {
    res.status(400).json({
      message: "Corpo inválido",
      bodyExpected: {
        name: "string",
        categoryID: "string",
        userID: "string",
        amount: "number",
        status: "PAGO || PENDENTE",
      },
    });
  }
  // else {
  //   const IdExpense = createIdByExpense(body.name, body.userID);
  //   const currentExpense = handleBodyExpenseRegister(body, IdExpense);
  //   expenses.push(currentExpense);
  //   res.status(200).json({ message: "usuário cadastrado com sucesso" });
  //   saveData(expenses, "expenses");
  // }

  const { categoryID, userID } = body;
  // Verifica se a cateforia e o usuário foram encontrados nos database "categories" e "users", respectivamente
  const foundCategory = categories.find(
    (category) => category.id === categoryID
  );
  const foundUser = users.find((user) => user.id === userID);
  const searchIndexUser = users.findIndex((user) => user.id === userID);
});

export default router;
