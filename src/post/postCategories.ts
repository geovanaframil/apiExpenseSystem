import { Router, Request, Response } from "express";
import saveData from "../utils/saveDataJson";
import readData from "../utils/readDataJson";
import ICategory from "../interfaces/categoryInterface";
import createIdByCategory from "../utils/createIdByCategory";
import verifyBodyCategory from "../utils/verifyBodyCategory";

const router = Router();
const data = require("../../database/categories.json");
const categories: ICategory[] = data;

function handleBodyCategory(returnAPI: any, idCategory: string): ICategory {
  const newCategory = {
    id: idCategory,
    name: returnAPI.name,
  };
  return newCategory;
}

router.post("/categories", (req: Request, res: Response) => {
  const body = req.body;
  const validBody = verifyBodyCategory(body);
  if (validBody.isValid) {
    const newIdCategory = createIdByCategory(body.name);
    const category = handleBodyCategory(body, newIdCategory);
    categories.push(category);
    res.status(200).json("categoria cadastrada com sucesso");
    saveData(categories, "categories");
  } else {
    res.status(400).json({message: validBody.message});
  }
});

export default router;
