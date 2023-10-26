import { createApp } from "./app.js";
import { MoviesModel } from './model/local-file-system/movies.js';

createApp({movieModel: MoviesModel});