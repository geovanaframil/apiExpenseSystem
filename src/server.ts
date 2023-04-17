import express from "express";
import getExpense from "./get/getExpenses";
import getExpenseById from "./get/getExpensesById";
import postExpenses from "./post/postExpenses";
import putExpenses from "./put/putExpenses";
import deleteExpenses from "./delete/deleteExpenses";

const app = express();
app.use(express.json());

app.use(getExpense);
app.use(getExpenseById);
app.use(postExpenses);
app.use(putExpenses);
app.use(deleteExpenses);

app.listen(3000, () => "server is running in port 3000");
