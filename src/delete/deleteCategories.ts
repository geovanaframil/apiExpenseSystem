import { Router, Request, Response } from "express";
import ICategory from "../interfaces/categoryInterface";
import saveData from "../utils/saveDataJson";

const router = Router();
const data = require("../../database/categories.json");
const categories: ICategory[] = data;

router.delete("/categories/:categoryID", (req: Request, res: Response) => {
    const id = req.params.categoryID;
    const categoryId = categories.find((item) => item.id === id);
    if (categoryId) {
      let categoryObject = categories.filter((item) => item.id !== id);
  
      res.status(200).json("Categoria removida com sucesso");
  
      saveData(categoryObject, "categories");
  
      return res.status(200).json(categoryId);
    } else {
      res.status(404).json(`Categoria correspondente ao id ${id} não existe`);
    }
  });
  
  export default router;