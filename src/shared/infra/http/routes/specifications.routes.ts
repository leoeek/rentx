import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListCategoriesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
    "/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createSpecificationController.handle
);

specificationsRoutes.get(
    "/", 
    ensureAuthenticated, 
    listSpecificationController.handle
);

export { specificationsRoutes };