import { Router, Request, Response } from "express";
import saveData from "../utils/saveDataJson";
import ICategory from "../interfaces/categoryInterface";
import createIdByCategory from "../utils/createIdByCategory";

const router = Router();
const Joi = require('joi')
const data = require("../../database/categories.json");
const categories: ICategory[] = data;

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required()
});

function handleBodyCategory(returnAPI: any, idCategory: string): ICategory {
  const newCategory = {
    id: idCategory,
    name: returnAPI.name,
  };
  return newCategory;
}

router.post("/categories", (req: Request, res: Response) => {
  const body = req.body;
  const { error, value } =  schema.validate(req.body)
  if (!error) {
    const newIdCategory = createIdByCategory(body.name);
    const category = handleBodyCategory(body, newIdCategory);
    categories.push(category);
    res.status(200).json("categoria cadastrada com sucesso");
    saveData(categories, "categories");
  } else {
    res.status(404).send(error.details[0].message);
  }
});

export default router;