import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {

  constructor({movieModel}) {
    this.movieModel = movieModel;
  }

  getAll = async (req,res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAll({genre});
    return res.json(movies);
  }

  create = async (req,res) => {
    const result = validateMovie(req.body);
    if(result.error) {
      return res.status(400).json({error: JSON.parse(result.error.message)});
    }
    const newMovie = await this.movieModel.create({input: result.data});
    return res.status(201).json(newMovie);
  }

  getById = async (req,res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getById({ id })
    if(movie) return res.json(movie);
    return res.status(404).json({message: 'Movie not found' });
  }

  update = async (req,res) => {
    const result = validatePartialMovie(req.body);
    if(!result.success) {
      return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const { id } = req.params;    
    const updateMovie = await this.movieModel.update({id, input: result.data});
    if(!updateMovie) {
      return res.status(404).json({message: 'Movie not found' });
    }
    
    return res.json(updateMovie);
  }

  delete = async (req, res) => {
    const { id } = req.params;
    const deleteMovie = await this.movieModel.delete({id});
    if(!deleteMovie) {
      return res.status(404).json({message: 'Movie not found' });
    }
    
    return res.json({message: 'Movie deleted'});
  }
}
