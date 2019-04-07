const BASE_URL = 'http://localhost:3000'
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

const renderTrainer = function () {
  fetch(TRAINERS_URL)
    .then((response) => {
      return response.json()
    })
    .then(function (trainerJson) {
      trainerJson.map(function (trainer) {
        main.innerHTML += `
                    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                    <ul class="pokemonlist">
                    </ul>
                     ${trainer.pokemons.map(pokemon => {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  }).join('')}
                    </div>
                    `
      })
    })
}

renderTrainer()

main.addEventListener('click', ev => {
  let clicked = ev.target.tagName
  if (clicked === 'BUTTON') {
    switch (ev.target.innerText) {
      case 'Add Pokemon':
        let trainerId = ev.target.dataset.trainerId
        fetch(POKEMONS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'trainer_id': trainerId
          })
        })
          .then(res => res.json())
        break;
      case 'Release':
        let pokemonId = ev.target.dataset.pokemonId
        fetch(`${POKEMONS_URL}/${pokemonId}`,
          {
            method: 'DELETE'
          })
          .then(res => res.json())
        break
    } // end of switch
  }
})// end of if statment


