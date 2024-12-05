const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: muestra el formulario de búsqueda
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/api/pokemon', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    console.log('No se proporcionó un nombre de Pokémon');
    return res.status(400).json({ error: 'Debe proporcionar un nombre de Pokémon' });
  }

  try {
    console.log(`Buscando datos para: ${name}`);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = response.data;

    console.log(`Datos encontrados para ${name}:`, pokemon);

    res.json({
      name: pokemon.name,
      weight: pokemon.weight,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map(type => type.type.name),
    });
  } catch (error) {
    console.error(`Error al buscar el Pokémon: ${error.message}`);
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
});




// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

