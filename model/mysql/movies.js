
import mysql from 'mysql2/promise';

const defaultConfig = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
};

const connectionString = process.env.DATABASE_URL ?? defaultConfig;

const connection = await mysql.createConnection(connectionString);

export class MoviesModel {
  static async getAll({ genre }) {
    const [movies, _] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
    )

    return movies;
  }

  static async create({ input }) {
    const {
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input;

    const [resultUUID] = await connection.query('SELECT UUID() uuid;');
    const [{uuid}] = resultUUID;

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (error) {
      throw new Error('Erro creating movie');
    }

    const [movie, _] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )


    return movie;
  }

  static async getById({id}) {
    const [movie, _] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    );
    return movie;
  }

  static async update ({id, input}) {
    try {
      await connection.query(
        `UPDATE movie SET ? WHERE id = UUID_TO_BIN(?);`,
        [input, id]
      )
    } catch (error) {
      console.log(error)
      throw new Error('Erro creating movie');
    }

    const [movie, _] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    return movie;
  }

  static async delete ({id}){
    try {
      await connection.query(
        `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
    } catch (error) {
      throw new Error('Erro creating movie');
    }

    return true;
  }
}