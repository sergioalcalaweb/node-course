import { MoviesModel } from "../model/movies.js";
import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  static async getAll (req,res) {
    const { genre } = req.query;
    const movies = await MoviesModel.getAll({genre});
    return res.json(movies);
  }

  static async create (req,res) {
    const result = validateMovie(req.body);
    if(result.error) {
      return res.status(400).json({error: JSON.parse(result.error.message)});
    }
    const newMovie = await MoviesModel.create({input: result.data});
    return res.status(201).json(newMovie);
  }

  static async getById (req,res) {
    const { id } = req.params;
    const movie = await MoviesModel.getById({ id })
    if(movie) return res.json(movie);
    return res.status(404).json({message: 'Movie not found' });
  }

  static async update (req,res) {
    const result = validatePartialMovie(req.body);
    if(!result.success) {
      return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const { id } = req.params;    
    const updateMovie = await MoviesModel.update({id, input: result.data});
    if(!updateMovie) {
      return res.status(404).json({message: 'Movie not found' });
    }
    
    return res.json(updateMovie);
  }

  static async delete (req, res) {
    const { id } = req.params;
    const deleteMovie = await MoviesModel.delete({id});
    if(!deleteMovie) {
      return res.status(404).json({message: 'Movie not found' });
    }
    
    return res.json({message: 'Movie deleted'});
  }
}
