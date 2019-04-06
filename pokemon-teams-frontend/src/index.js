const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
  getTrainers()
})

function getTrainers() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainerCards(json))
}

function renderTrainerCards(trainers) {
  const main = document.querySelector('main')
  trainers.forEach(trainer => {
    const div = document.createElement('div')
    const ul = document.createElement('ul')
    div.setAttribute("class", "card" )
    div.setAttribute("data-id", trainer.id)

    div.innerHTML = `
      <p>${trainer.name}</p>
      <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
      </div>
    `

    trainer.pokemons.forEach(pokemon => {

      ul.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      div.appendChild(ul)
    })

    main.appendChild(div)
    document.querySelector("main").addEventListener('click', editPokemon)

  })
}

function editPokemon(e) {
  if (e.target.className === "add") {
    return fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "trainer_id": (e.target.attributes.getNamedItem('data-trainer-id')).value
      })
    })
    .then(response => response.json())
    .then(json => addPokemon(json))
  } else if (e.target.className = "release") {
      // console.log(e.target.attributes.getNamedItem('data-pokemon-id').value)
      // console.log(JSON.stringify(e.target.attributes.getNamedItem('data-pokemon-id').value))

      return fetch(`${POKEMONS_URL}/${(e.target.attributes.getNamedItem('data-pokemon-id').value)}`, {
        method: "DELETE",
      })
      .then(response => response.json())
      .then(json => removePokemon(json))
  }
}

function addPokemon(json) {
  // console.log(json.trainer_id)
  Array.from(document.querySelectorAll("div")).forEach(div => {
    // console.log(div.getAttribute('data-id'))
    if (parseInt(div.getAttribute('data-id')) === json.trainer_id) {
      div.children[2].innerHTML += `<li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
    }
  })
}

function removePokemon(json) {
  Array.from(document.querySelectorAll(".release")).forEach(button => {
    // console.log("button", button.getAttribute('data-pokemon-id'))
    // console.log("json", json.id);
    if (json.id === parseInt(button.getAttribute('data-pokemon-id'))) {
      button.parentNode.remove()
    }
  })
}
