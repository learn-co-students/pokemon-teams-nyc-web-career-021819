const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//create card elements
//append cards to <main>

document.addEventListener('DOMContentLoaded', function () {

  const fetch_and_render_trainers = function() {
    fetch(TRAINERS_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      all_trainers = JSON.parse(JSON.stringify(myJson))
      main.innerHTML = ""
      render_all_trainer_cards(all_trainers)
    })
  }

  const main = document.querySelector("main")
  let all_trainers = []
  let trainer_id = ""
  let pokemon_id = ""
  button = document.querySelector

  const create_trainer_card = function (trainer) {
    //need trainer id
    div = document.createElement("div")
    div.className = "card"
    div.dataset.id = trainer.id

    add_pokemon_button = document.createElement("button")
    add_pokemon_button.dataset.id = trainer.id
    add_pokemon_button.dataset.action = "add"
    add_pokemon_button.innerText = "Add Pokemon"

    trainer_name = document.createElement("p")
    trainer_name.innerText = `${trainer.name}`

    ul = document.createElement("ul")

    div.appendChild(trainer_name)
    div.appendChild(add_pokemon_button)
    div.appendChild(ul)
    return div
  }

  const render_trainercard = function (node) {
    main.appendChild(node)
  }


  const trainercard_lis = function (pokemon) {
    li = document.createElement("li")
    li.innerHTML = `

    <li> ${pokemon.nickname} (${pokemon.species})
    <button class="release" data-action="release" data-pokemon-id=${pokemon.id}> Release </button></li>`
    return li
  }

  const render_all_trainer_cards = function (trainers) {
    trainers.map(function (trainer) {
      trainer_card = create_trainer_card(trainer)
      render_trainercard(trainer_card)
        trainer["pokemons"].map(function (pokemon) {
          lis = trainercard_lis(pokemon)
          trainer_card.querySelector("ul").appendChild(lis)
        })
    }
  )}

  const addpokemon = function (){
    trainer = all_trainers.find(function(trainer){
      return trainer.id === parseInt(trainer_id)
    })

    if (trainer.pokemons.length < 6) {
      create_pokemon()

    }
  }

  const create_pokemon = function () {
    return fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({'trainer_id': parseInt(trainer_id)})
    })
    .then(function () {
      fetch_and_render_trainers()
    })
  }
  const release_pokemon = function () {
    return fetch(`${POKEMONS_URL}/${parseInt(pokemon_id)}`, {
      method: "DELETE"
      // headers: {
      //   "Content-Type": "application/json"
      // },
      // body: JSON.stringify({'trainer_id': parseInt(trainer_id)})
    })
    .then(function () {
      fetch_and_render_trainers()
    })
  }


  const fetch_trainers = function () {
    fetch(TRAINERS_URL)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        all_trainers = JSON.parse(JSON.stringify(myJson))
      })
  }

  fetch_and_render_trainers()

  main.addEventListener('click', function(e){

    console.log('target', e.target.dataset)
    if (e.target.dataset.action === "add") {
      trainer_id = e.target.dataset.id
      fetch_trainers()
      addpokemon()
    }

    if (e.target.dataset.action === "release"){
      pokemon_id = e.target.dataset.pokemonId
      release_pokemon()
    }

  })

})
