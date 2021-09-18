
document.addEventListener("DOMContentLoaded", () =>{

    let generateBtn = document.querySelector('#generate-kanto');
    generateBtn.addEventListener('click', renderEverything)

    getDeleteBtn().addEventListener('click', deleteEverything);
})

function renderEverything(){
    let allPokemonContainer = document.querySelector('#kanto-container')
    allPokemonContainer.innerText = "";
    fetchKantoPokemon();

    getDeleteBtn().style.display = 'block'
}

function getDeleteBtn(){
    return document.querySelector('#delete-btn')
}


function fetchKantoPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(function(allpokemon){
            allpokemon.results.forEach(function(pokemon){
                fetchPokemonData(pokemon);
            })
        })
}

function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch.
    //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
        .then(response => response.json())
        .then(function(pokeData){
            renderPokemon(pokeData)
            console.log(pokeData)
        })
}


function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('kanto-container');
    let pokeContainer = document.createElement("tr") //div will be used to hold the data/details for indiviual pokemon.{}


    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('td')
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('td')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeTypes = document.createElement('td') //ul list will hold the pokemon types
    createTypes(pokeData.types, pokeTypes) // helper function to go through the types array and create li tags for each one

    let pokeMoves = document.createElement('td')
    let select = document.createElement('select')
    select.classList.add('form-control')
    pokeMoves.append(createMoves(pokeData.moves, select))

    pokeContainer.append(pokeName,pokeNumber, pokeTypes, pokeMoves);   //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

function createMoves(moves, td){
    let start = document.createElement('option')
    start.innerText = "Move list"
    start.setAttribute('selected', 'selected')
    start.setAttribute('disabled', 'disabled')
    start.setAttribute('hidden', 'hidden')
    td.append(start)
    moves.forEach(function(move){
        let movesLi = document.createElement('option');
        movesLi.innerText = move['move']['name'];
        td.append(movesLi)
    })
    return td
}

function createPokeImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('td')

    let pokeImage = document.createElement('img')
    if(pokeID < 10){
    pokeImage.srcset = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokeID}.png ` //`https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    }else if(pokeID <100){
    pokeImage.srcset = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokeID}.png ` //`https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    }else{
    pokeImage.srcset = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeID}.png ` //`https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
    }
    pokeImage.width = 150;
    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}

function deleteEverything(event){
    event.target.style = 'none';
    let allPokemonContainer = document.querySelector('#kanto-container')
    allPokemonContainer.innerText = ""
}
