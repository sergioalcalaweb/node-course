import { createApp } from "./app.js";
import { MoviesModel } from "./model/mysql/movies.js";

createApp({movieModel: MoviesModel});