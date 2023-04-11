import express from "express";
import { Router } from "express";

const app = express();
app.use(express.json());

app.listen(3000, () => "server is running in port 3000");
