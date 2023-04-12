import express from "express";
import getExpense from "./get/getExpenses";

const app = express();
app.use(express.json());

app.use(getExpense);

app.listen(3000, () => "server is running in port 3000");
