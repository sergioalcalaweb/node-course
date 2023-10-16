import express, { json } from 'express';
import { movieRouter } from './routes/movies.js';
import { corsMiddleware } from './middleware/cors.js';


const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(json());
// app.use(corsMiddleware)


app.get('/', (req, res) => {
  res.send('<h1>Mi Pagina</h1>')
})

app.use('/movies', movieRouter);

app.use((_, res) => {
  res.status(404).send('<h1>Aqui no hay nada perro =(</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
})