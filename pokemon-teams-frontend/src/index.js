const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")
let trainersArray = []


document.addEventListener('DOMContentLoaded', ev => {
  fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    trainersArray = data
    console.log(trainersArray)
    main.innerHTML = ''


    trainersArray.forEach(function(trainer){
      let card = document.createElement("div")
      card.className = "card"
      card.id = `${trainer.id}`
      let p = document.createElement("p")
      p.innerText = `${trainer.name}`
      card.appendChild(p)
      let createButton = document.createElement("button")
      createButton.id = `trainer-id-${trainer.id}`
      createButton.dataset.action = "create-pokemon"
      createButton.innerText = "Add Pokemon"
      card.appendChild(createButton)
      let ul = document.createElement("ul")
        trainer.pokemons.forEach(function(pokemon){
          let li = document.createElement("li")
          li.innerText = `${pokemon.nickname} (${pokemon.species})`
          let releaseButton = document.createElement("button")
          releaseButton.className = "release"
          releaseButton.id = `pokemon-id-${pokemon.id}`
          releaseButton.dataset.action = "release"
          releaseButton.innerText = "Release"
          li.appendChild(releaseButton)
          ul.appendChild(li)
        })
      card.appendChild(ul)
      main.appendChild(card)
    })



  });

  main.addEventListener('click', ev => {
    if (ev.target.dataset.action === "release"){
        pokeId = ev.target.id.slice(11)
        fetch(`http://localhost:3000/pokemons/${pokeId}`, {method:"delete"})
        ev.target.parentElement.remove()
    }
    if (ev.target.dataset.action === "create-pokemon"){
       pokeCard = document.getElementById(`${ev.target.id.slice(11)}`)
       if (pokeCard.querySelectorAll("li").length < 6){
       fetch(`http://localhost:3000/pokemons`, {     method:"post",
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({trainer_id: `${ev.target.id.slice(11)}` })
        })
        fetch(TRAINERS_URL)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          main.innerHTML = ''
          trainersArray = data
          trainersArray.forEach(function(trainer){
            let card = document.createElement("div")
            card.className = "card"
            card.id = `${trainer.id}`
            let p = document.createElement("p")
            p.innerText = `${trainer.name}`
            card.appendChild(p)
            let createButton = document.createElement("button")
            createButton.id = `trainer-id-${trainer.id}`
            createButton.dataset.action = "create-pokemon"
            createButton.innerText = "Add Pokemon"
            card.appendChild(createButton)
            let ul = document.createElement("ul")
              trainer.pokemons.forEach(function(pokemon){
                let li = document.createElement("li")
                li.innerText = `${pokemon.nickname} (${pokemon.species})`
                let releaseButton = document.createElement("button")
                releaseButton.className = "release"
                releaseButton.id = `pokemon-id-${pokemon.id}`
                releaseButton.dataset.action = "release"
                releaseButton.innerText = "Release"
                li.appendChild(releaseButton)
                ul.appendChild(li)
              })
            card.appendChild(ul)
            main.appendChild(card)
          })

        })
      }

      else {
        alert("This trainer already has 6 pokemon! Please release one first!")
      }

    }

  })


})
