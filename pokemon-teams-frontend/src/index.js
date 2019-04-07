const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    // Get Trainers
    fetch(TRAINERS_URL)
    .then(function(response){
        return response.json()
    })
    .then(function(trainers){
        renderTrainers(trainers)
        addPokemon()
        releasePokemon()

    })
})

function renderTrainers(trainers) {
    const main = document.querySelector('main')
    trainers.forEach(function(trainer) {
        main.innerHTML += `
        <div class="card" data-id="${trainer.id}">
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        `
        ul = document.createElement('ul')
        renderPokemons(trainer.pokemons).forEach(function(li) {
            ul.appendChild(li)
        })
        card = main.querySelector(`[data-id='${trainer.id}']`)
        card.appendChild(ul)
    })
}

function renderPokemons(pokemons) {
    domPokemons = pokemons.map(function(pokemon){
        li = document.createElement('li')
        li.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) 
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        `
        return li
    })
    return domPokemons
}

function addPokemon() {
    const main = document.querySelector('main')
    main.addEventListener("click", function(e) {
        if (e.target.innerText === "Add Pokemon") {
            getPokemon(e.target.dataset.trainerId)
        }
    })
}

function getPokemon(trainerId) {
    fetch(POKEMONS_URL, {
        method: 'POST',
        body: JSON.stringify({"trainer_id": trainerId}),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(function(response){
        hi = renderPokemons([response])
        card = document.querySelector(`[data-id='${trainerId}']`)
        card.querySelector('ul').appendChild(hi[0])
    })
}

function releasePokemon() {
    const main = document.querySelector('main')
    main.addEventListener('click', function(e){
        if (e.target.className === 'release') {
            deletePokemon(e.target.dataset.pokemonId)
        }
    })
}

function deletePokemon(pokemonId) {
    fetch(POKEMONS_URL + `/${pokemonId}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(function(response){
        button = document.querySelector(`[data-pokemon-id='${response.id}']`)
        button.parentNode.remove()
    })
}
