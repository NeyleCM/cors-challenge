const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Ruta para obtener todos los personajes
app.get('/characters', async (req, res) => {
    const url = 'https://rickandmortyapi.com/api/character';
    try {
        const response = await axios.get(url);
        const characters = response.data.results;
        res.json(characters);
    } catch (error) {
        res.status(500).json({ ERROR: 'Error al obtener los personajes' });
    }
});

// Ruta para obtener información de personajes por nombre
app.get('/characters/:name', async (req, res) => {
    const name = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    try {
        const response = await axios.get(url);
        const characters = response.data.results;  // Obtener todos los resultados que coinciden con el nombre
        if (characters.length === 0) {
            res.status(404).json({ ERROR: 'Personaje no encontrado' });
        } else {
            // Enviar todos los personajes encontrados
            res.json(characters.map(character => ({
                name: character.name,
                status: character.status,
                species: character.species,
                gender: character.gender,
                origin: character.origin.name,
                image: character.image
            })));
        }
    } catch (error) {
        res.status(500).json({ ERROR: 'Error al obtener los personajes' });
    }
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor de Rick and Morty API ejecutándose en http://localhost:3001');
});

/*const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilita CORS para que el frontend pueda hacer solicitudes al backend

// Ruta para obtener todos los personajes (si lo necesitas)
app.get('/characters', async (req, res) => {
    const url = 'https://rickandmortyapi.com/api/character';
    try {
        const response = await axios.get(url);
        const characters = response.data.results;
        res.json(characters);
    } catch (error) {
        res.status(500).json({ ERROR: 'Error al obtener los personajes' });
    }
});

// Ruta para obtener información de un personaje por nombre
app.get('/characters/:name', async (req, res) => {
    const name = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    try {
        const response = await axios.get(url);
        const character = response.data.results[0];
        const { name, status, species, gender, origin, image } = character;
        res.json({ name, status, species, gender, origin: origin.name, image });
    } catch (error) {
        res.status(404).json({ ERROR: 'Personaje no encontrado' });
    }
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor de Rick and Morty API ejecutándose en http://localhost:3001');
});
*/

/*
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Ruta para obtener información de un personaje por nombre
app.get('/characters/:name', async (req, res) => {
    const name = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
    try {
        // Petición a la API de Rick and Morty con el nombre del personaje
        const response = await axios.get(url);
        const character = response.data.results[0];  // Obtenemos el primer resultado (más relevante)
        const { name, status, species, gender, origin, image, } = character;
        // Respuesta con los datos del personaje
        res.json({ name, status, species, gender, origin: origin.name, image, });
    } catch (error) {
        res.status(404).json({ ERROR: 'Personaje no encontrado' });
    }
});

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor de Rick and Morty API ejecutándose en http://localhost:3001');
});

*/