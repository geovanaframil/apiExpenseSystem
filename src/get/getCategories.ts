import { Router, Request, Response } from "express";
import readData from "../utils/readDataJson";
import ICategory from "../interfaces/categoryInterface";

const router = Router();
let categories: ICategory[];

async function initializeCategories() {
  const data = await readData("categories");
  categories = data as ICategory[];
}

initializeCategories();

router.get("/categories", (req: Request, res: Response) => {
  if (categories.length !== 0) {
    res.status(200).json(categories);
  } else {
    res.status(204).json();
  }
});

export default router;
