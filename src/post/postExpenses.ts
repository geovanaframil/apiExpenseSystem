import { Router, Request, Response } from "express";
import createIdByExpense from "../utils/createIdByExpense";
import {
  IExpense,
  IExpenseBodyPost,
} from "../interfaces/expenseInterface";
import postBodySchema from "../utils/verifyBodyExpense";
import saveData from "../utils/saveDataJson";
import ICategory from "../interfaces/categoryInterface";
import {User, IExpenseByUserWithUser} from "../interfaces/userInterface";

const router = Router();

const expensesData = require("../../database/expenses.json");
const usersData = require("../../database/users.json");
const categoriesData = require("../../database/categories.json");

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

  const { categoryID, userID } = body;
  // Verifica se a cateforia e o usuário foram encontrados nos database "categories" e "users", respectivamente
  const foundCategory = categories.find(
    (category) => category.id === categoryID
  );
  const foundUser = users.find((user) => user.id === userID);
  const searchIndexUser = users.findIndex((user) => user.id === userID);

  if (foundCategory && foundUser) {
    const { id, name, lastName, email } = foundUser;
    const generatedId = createIdByExpense(name);
    const newExpense: IExpense = {
      id: generatedId,
      ...body,
      _user: {
        id,
        name,
        lastName,
        email,
      },
      _category: {
        ...foundCategory,
      },
      status: "",
    };

    const newExpenseByUser: IExpenseByUserWithUser = {
      id: generatedId,
      ...body,
      _user: {
        id,
        name,
        lastName,
        email,
      },
      _category: {
        ...foundCategory,
      },
      status: "",
    };
    

    users[searchIndexUser]._expenses.push(newExpenseByUser);
    expenses.push(newExpense);

    saveData(expenses, "expenses");
    saveData(users, "users");

    return res.status(200).json(newExpense);
  } else {
    return res.status(400).json({ message: "Corpo inválido" });
  }
});

export default router;
