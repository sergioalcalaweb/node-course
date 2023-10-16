import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

// import { readFileSync } from 'node:fs';

// esto esta prohibido en la especificacion de emacscript modules 
// import movies from './movies.json';

//Como leer archivo 
// metodo 1 
// const movies = JSON.parse(readFileSync('./movies.json', 'utf-8'));

// metodo valido 

export const readJSON = (path) => require(path);