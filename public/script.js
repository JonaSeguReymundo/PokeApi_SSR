function buscarPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const url = `/api/pokemon?name=${pokemonName}`;
    console.log(`Buscando: ${url}`); // Log para verificar la URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const pokemonInfo = document.getElementById('pokemon-info');
            pokemonInfo.innerHTML = `
                <img src="${data.sprite}" alt="${data.name}">
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Peso:</strong> ${data.weight} lb</p>
                <p><strong>Tipo:</strong> ${data.types.join(', ')}</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error); // Log del error en cliente
            document.getElementById('pokemon-info').innerHTML = '<p>Pokémon no encontrado</p>';
        });
}
