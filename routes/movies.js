import { Router } from "express";
import { MovieController } from "../controller/movies.js";

export const movieRouter = Router();

movieRouter.get('/', MovieController.getAll);
movieRouter.post('/',MovieController.create);
movieRouter.get('/:id', MovieController.getById);
movieRouter.patch('/:id', MovieController.update);
movieRouter.delete('/:id', MovieController.delete);

