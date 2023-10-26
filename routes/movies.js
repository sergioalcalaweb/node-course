import { Router } from "express";
import { MovieController } from "../controller/movies.js";


export const createMovieRouter = ({ movieModel }) => {
  const movieRouter = Router();
  const controller = new MovieController({ movieModel });
  movieRouter.get('/', controller.getAll);
  movieRouter.post('/',controller.create);
  movieRouter.get('/:id', controller.getById);
  movieRouter.patch('/:id', controller.update);
  movieRouter.delete('/:id', controller.delete);
  return movieRouter;
}
