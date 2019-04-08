

document.addEventListener('DOMContentLoaded', function () {

    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    let trainers
    let pokemons 

    const mainTag = document.querySelector("main")

    //grabing pokemon and create cards for each trainner
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(function(json){
        trainers = json
        pokemons = json.pokemons      
        json.forEach(trainer => {
            // console.log(trainer.pokemons[0].nickname)
             mainTag.innerHTML +=`
             <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                <ul>${trainer.pokemons.map(pokemon=>{
                return `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`}).join("")}
                </ul>
                </div>`
        }); // end of fetching&creating trainer card

    })//end of fetch trainers url
    mainTag.addEventListener("click", function (e) {
        //check if user click on add button
        if (e.target.innerText === "Add Pokemon"){    
            let clickedTrainerId = e.target.dataset.trainerId
            // make a post request to Create
            fetch(POKEMONS_URL,{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                },//end of headers
                body: JSON.stringify({
                    'trainer_id': clickedTrainerId
                })
            })//end of fetch to pokemon url
            .then(rep=>rep.json())
            .then(function(pokemon){
                //grab ul list
                if (!pokemon.error){
                // console.log(pokemon.nickname)
                let ulTag = document.querySelector("ul")
                ulTag.innerHTML += `
                <li>${pokemon.nickname} (${ pokemon.species}) <button class= "release" data-pokemon-id="${pokemon.id}" > Release</button >
                </li >`
                }
            })

        } else if (e.target.innerText === "Release") {
            let deletePokemonId = e.target.dataset.pokemonId
            // console.log(deletePokemonId)
            event.target.parentNode.remove()
            fetch(`http://localhost:3000/pokemons/${deletePokemonId}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json',
                    'Accpet':'application/json'
                },//end of fetch url
                body: JSON.stringify({
                    'trainer_id' : deletePokemonId
                })
            })//end of delete request
        }
        
    })//end of adding pokemon event


})//end of content load
