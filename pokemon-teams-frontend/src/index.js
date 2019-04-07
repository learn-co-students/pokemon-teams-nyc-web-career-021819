const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

loadTrainers()

//Define elements
//Get pokemon container
const pokemonContainer = document.getElementById('main-container')


//Add event
pokemonContainer.addEventListener('click', addPokemon);

//Fill pokemon container with trainers
function loadTrainers() {
  fetch(`${TRAINERS_URL}`)
  .then((res) => {return res.json()})
  .then((trainers) => {
    let output =''
    trainers.forEach((trainer) => {
      output +=
      `
      <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class="add-button">Add Pokemon</button>
        <ul id"trainer-ul" data-pokemons=${trainer.pokemons.length}>
        `+renderPokemon(trainer)+`</ul>
      </div>
      `
    })
    pokemonContainer.innerHTML = output
  })
  }

//Render pokemon to trainer
function renderPokemon(obj) {
  let output = ''
  obj.pokemons.forEach((pokemon) => {
    output += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  })
  return output
}

//Add and Delete Pokemons 
function addPokemon(e) {
  //Add pokemon to trainer
  if (e.target.className === 'add-button') {
    let trainerId = e.target.parentElement.dataset.id
    fetch(`${POKEMONS_URL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({trainer_id:trainerId})
    })
    .then((res) => {return res.json()})
    .then((data) => {
      loadTrainers()
    })
  }

  //Delete pokemon from trainer
  if (e.target.className === 'release') {
    let pokemonId = e.target.dataset.pokemonId
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: `${pokemonId}`})
    })
    loadTrainers()
  }
}
