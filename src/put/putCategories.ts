import { Router, Request, Response } from "express";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";
import ICategory from "../interfaces/categoryInterface";

const router = Router();
const data = require("../../database/categories.json");
const categories: ICategory[] = data;

router.put("/categories/:categoryID", (req: Request, res: Response) => {
  const id = req.params.categoryID;
  const body = req.body;

  const categoryIndex = categories.findIndex((expense) => expense.id === id);
  if (categoryIndex === -1) {
    return res
      .status(404)
      .json(`Despesa correspondente ao id ${id} não existe`);
  }

  if (!body.name || typeof body.name !== "string") {
    return res.status(400).json({
      errors: "Propriedade name é obrigatória e deve ser do tipo string",
    });
  } else {
    const currentCategory = categories[categoryIndex];
    const updatedCategory = { ...currentCategory, ...body };
    categories.splice(categoryIndex, 1, updatedCategory);

    res
      .status(200)
      .json({ message: "Despesa atualizada com sucesso", updatedCategory });
    saveData(categories, "categories");
  }
});

export default router;
