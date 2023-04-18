import { Router, Request, Response } from "express";
import readData from "../utils/readDataJson";
import ICategory from "../interfaces/categoryInterface";

const router = Router();
let categories: ICategory[];

async function initializecategories() {
  const data = await readData("categories");
  categories = data as ICategory[];
}

initializecategories();

router.get("/categories/:categoryID", (req: Request, res: Response) => {
  const id = req.params.categoryID;
  const categoryId = categories.find((item) => item.id === id);
  if (categoryId) {
    return res.status(200).json(categoryId);
  } else {
    res.status(404).json(`Despesa correspondente ao id ${id} não existe`);
  }
});

export default router;
