import express from 'express'
import postUser from './post/postUser'
import getUser from './get/getUser'
import putUser from './put/putUser'
import deleteUser from './delete/deleteUser'
import getUserById from './get/getUserId'

import getCategories from "./get/getCategories";
import getCategoriesById from "./get/getCategoriesById";
import postCategories from "./post/postCategories";
import putCategories from "./put/putCategories";
import deleteCategories from "./delete/deleteCategories";

import getExpense from "./get/getExpenses";
import getExpenseById from "./get/getExpensesById";
import postExpenses from "./post/postExpenses";
import putExpenses from "./put/putExpenses";
import deleteExpenses from "./delete/deleteExpenses";

const app = express();
app.use(express.json());
app.use(postUser)
app.use(getUser)
app.use(putUser)
app.use(deleteUser)
app.use(getUserById)

app.use(getCategories);
app.use(getCategoriesById);
app.use(postCategories);
app.use(putCategories);
app.use(deleteCategories);

app.use(getExpense);
app.use(getExpenseById);
app.use(postExpenses);
app.use(putExpenses);
app.use(deleteExpenses);

app.listen(3000, () => "server is running in port 3000");
