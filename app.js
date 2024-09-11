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