const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {

//DOM PAGE
const main = document.querySelector("main")
let trainers = [] //to access all trainers in global scope
// let pokemons = [] //to access all pokemons on global scope

//When a user loads the page, they should see all trainers, with their current team of Pokemon.
fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json()
  })//ends first then.
  .then(function(json) {
    trainers = json // setting the json data to the trainers array
    main.innerHTML = '' // sets the main area to empty
    createTrainerCards(trainers)
  })//ends second then.

  function createTrainerCards(array) {
    array.forEach(function(trainer) {
      //creates trainer card
      let card = document.createElement("div")
      card.className = "card"
      card.dataset.id = trainer.id

      //adds trainers name as a "p"
      let trainerName = document.createElement("p")
      trainerName.innerText = trainer.name

      //create add button
      let addButton = document.createElement("button")
      addButton.dataset.id = trainer.id
      addButton.dataset.action = "add"
      addButton.innerText = "Add Pokemon"

      //create ul for the trainers pokemon
      let ul = document.createElement("ul")  // creating ul first
      ul.dataset.id = trainer.id

      pokemons = trainer.pokemons.forEach(function(pokemon) {  // adds all the pokemon to a global pokemon array also
        const li = createPokemon(pokemon) // creates all the pokemon and sets it to a variable
        //append the li to the ul
        ul.appendChild(li) // adds all the pokemon to the ul 

      })//end of forEach on trainer's pokemons

      //append everything to the card
      card.appendChild(trainerName)
      card.appendChild(addButton)
      card.appendChild(ul)

      //append card to the main dom area
      main.appendChild(card)

    })//end of forEach loop
  }//end of createTrainerCards function

  //Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.

  main.addEventListener("click", function(e) {
    if (e.target.dataset.action === "release") {
      releasePokemon(e.target.dataset.id) // e.target.dataset.id is the pokemon id
    } else if (e.target.dataset.action === "add") {
       const trainerID = e.target.dataset.id
       const ul = document.querySelector(`ul[data-id="${trainerID}"]`)
       if (ul.childNodes.length < 6) {
         addPokemon(e.target.dataset.id)
       } else {
         alert("Trainer has too many Pokemon!")
       }//end of if

    }//end of if
  })//end of main.addEventListener

  function releasePokemon(id) { //takes in a pokemon id
    return fetch(`${POKEMONS_URL}/${id}`, {
      method: "DELETE",
    })//end of fetch
    .then(function(response) {
      return response.json()
  })//end of first then.
    .then(function(pokemon) {
      const specifcPokemon = document.querySelector(`li[data-id="${id}"]`) // grabs the specifc pokemon with the given arguement id
      const listofPokemon = specifcPokemon.parentNode  // retrieves the parent ul for the li
      listofPokemon.removeChild(specifcPokemon) // remove the pokemon ul from the li
    })//end of 2nd .then
  }//end of releasePokemon

  function addPokemon(id) {
    return fetch(`${POKEMONS_URL}`, {
      method: "POST",
      headers: {
                 'Content-Type': 'application/json'
               },
      body: JSON.stringify({"trainer_id": `${id}`})
    })//end of fetch for POST
      .then(function(response) {
        return response.json()
      })//end of first then.
      .then(function(pokemon) {
        const trainerList = document.querySelector(`ul[data-id="${id}"]`)
        const li = createPokemon(pokemon)
        //append the li to the ul
        trainerList.appendChild(li)
      })//end of 2nd .then
  } // end of addPokemon

  function createPokemon(pokemon) {
    let li = document.createElement("li")  //creating list for the pokemon, belongs in the ul
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    li.dataset.id = pokemon.id

    //create release button
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.dataset.id = pokemon.id
    releaseButton.dataset.action = "release"
    releaseButton.innerText = "Release"

    //append the button to the li
    li.appendChild(releaseButton)
    return li
  }





})// closes DOMContentLoaded
