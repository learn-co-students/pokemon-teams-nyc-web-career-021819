const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

// window.addEventListener('DOMContentLoaded', e => {
// console.log("Dom content has loaded")

  fetchFunction(TRAINERS_URL, buildTrainerCard)

  main.addEventListener('click', e => {
    e.preventDefault()
    let trainerId = e.target.dataset.trainerId
    if(trainerId){
      updateFetch(POKEMONS_URL, "POST", trainerId)
    }
    let pokemonId = e.target.dataset.pokemonId
    if(e.target.dataset.pokemonId){
      updateFetch(`${POKEMONS_URL}/${pokemonId}`, "DELETE", pokemonId)
    }

  })

  //helper methods
  function fetchFunction(url, callBack){
    fetch(url)
    .then(res => res.json())
    .then(callBack)
    .catch(e => (alert('fetch could not complete')))
  };

  function updateFetch(postUrl, method, value){
    fetch(postUrl, {
      method: method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"trainer_id": value})
    })
    .then(res => res.json())
    .then(data => {
      fetchFunction(TRAINERS_URL, buildTrainerCard)
    })
    .catch(e => (alert("Cant have more than 6 Pokemon")))
  };

  function buildTrainerCard(data){
    main.innerHTML = ""
    data.forEach(trainer => {

      let trainerDiv = document.createElement('div')
      let trainerNameP = document.createElement('p')
      let addPokeButton = document.createElement('button')
      let pokeUl = document.createElement('ul')

      addPokeButton.dataset.trainerId = trainer.id
      addPokeButton.innerText = "Add Pokemon"
      trainerDiv.className = "card"
      trainerDiv.dataset.id = 1
      trainerNameP.innerText = trainer.name

      trainerDiv.appendChild(trainerNameP)
      trainerDiv.appendChild(addPokeButton)
      main.appendChild(trainerDiv)

      trainerDiv.appendChild(pokeUl)

      trainer.pokemons.forEach(pokemon => {
        let pokeLi = document.createElement('li')
        pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`
        pokeUl.appendChild(pokeLi)
        let releasePokeButtom = document.createElement('button')
        releasePokeButtom.className = "release"
        releasePokeButtom.dataset.pokemonId = pokemon.id
        releasePokeButtom.innerText = "Release"
        pokeLi.appendChild(releasePokeButtom)
      });
    });
  }


// })
