import { Router } from "express";
import multer from 'multer';
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.post(
    "/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCategoryController.handle
);

categoriesRoutes.get(
    "/", 
    ensureAuthenticated,
    listCategoryController.handle
);

categoriesRoutes.post(
    "/import", 
    ensureAuthenticated,
    ensureAdmin,
    upload.single("file"), 
    importCategoryController.handle
);

export { categoriesRoutes };