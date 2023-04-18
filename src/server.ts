import express from "express";

import getCategories from "./get/getCategories"
import getCategoriesById from "./get/getCategoriesById"
import postCategories from "./post/postCategories";
// import putCategories from "./put/putCategories"

import getExpense from "./get/getExpenses";
import getExpenseById from "./get/getExpensesById";
import postExpenses from "./post/postExpenses";
import putExpenses from "./put/putExpenses";
import deleteExpenses from "./delete/deleteExpenses";

const app = express();
app.use(express.json());

app.use(getCategories);
app.use(getCategoriesById);
app.use(postCategories);
// app.use(putCategories);

app.use(getExpense);
app.use(getExpenseById);
app.use(postExpenses);
app.use(putExpenses);
app.use(deleteExpenses);

app.listen(3000, () => "server is running in port 3000");
