const url = 'https://pokeapi.co/api/v2/pokemon/';
let allPokemon = [];
let favoritePokemons = [];
async function loadPokemon() {
    document.getElementById('card-box').innerHTML += '';

    for (let i = 0; i < 151; i++) {
        const pokemon_url = url + (i + 1);
        let response = await fetch(pokemon_url);
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
        renderPokemonInfo(i);
        setBackground(i);
    }

    console.log('Loaded pokemon', allPokemon);
}

function renderFavoritePokemon() { 
    document.getElementById('card-box').innerHTML += '';
}

function renderPokemonInfo(i) {
    document.getElementById('card-box').innerHTML += templateCreateField(i);
    document.getElementById('pokemon-name-' + i).innerHTML = allPokemon[i]['name'];
    document.getElementById('pokemon-id-' + i).innerHTML += allPokemon[i]['id'];
    document.getElementById('pokemon-img-' + i).src = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
    for (let j = 0; j < allPokemon[i]['types'].length; j++) {
        document.getElementById('pokemon-attribut-' + i).innerHTML += templateFieldAttribute(i, j);
    }
    
}

//onclick="renderBigPokemonCard(${i})"
function templateCreateField(i) {
    return /*html*/`
    <div id="pokedex-${i}" class="pokedex bg-${allPokemon[i]['types'][0]['type']['name']}"> 
        <div id="one">
            <h2 id="pokemon-name-${i}" class="pokemon-name"></h2>
            <h2 id="pokemon-id-${i}" class="pokemon-id">#</h2>
            <div id="pokemon-attribut-${i}" class="pokemon-attribut-container"></div>
        </div>
        <div id="two">
            <img id="pokemon-img-${i}" class="pokemon-img">
        </div>
        <div id=three>
            <img onclick="saveFavoritePokemon(${i})" id="like-img-${i}" style="height:35px"; src="img/favorite-3-128.ico" alt="">
        </div>
        
    </div>
    `;
}

function saveFavoritePokemon(i) {
   
    let currentFavoritePokemonID = document.getElementById(`pokemon-id-${i}`);
    changeHeart(i);
    if(allPokemon == ''){
        currentFavoritePokemonID.push(favoritePokemons);
    } 
    

    //POKEMON.push(favoritePokemons[i]);
    //save
}

function changeHeart(i) {
    document.getElementById(`like-img-${i}`).src = 'img/heart-69-128.ico';
}

function templateFieldAttribute(i, j) {
    return `
    <div class="pokemon-attribut" id="pokemon-attribut-${i}-${j}">
        <img src="icons/${allPokemon[i]['types'][j]['type']['name']}.svg" alt="" class="type1-pic" id="type1-pic${i}" style="height:20px">
        ${allPokemon[i]['types'][j]['type']['name']}
    </div>
    `;
}

function openSearchField() {
    document.getElementById('searchField').classList.add('d-none');
    document.getElementById('searchInputField').classList.remove('d-none');
    document.getElementById('searchInputField').classList.add('searchInputField');
}

function renderBigPokemonCard(i){
    openBigCard(i);
}

function openBigCard(i) {
    document.getElementById('bigCardContainer').classList.remove('d-none');
    document.getElementById('bigCardContainer').classList.add('bigCardContainer');
    document.getElementById('bigCardContainer').innerHTML += templateCreateBigCard(i);
    
    /** 
     *let bigCard = document.getElementById('bigCardContainer');
    bigCard.innerHTML = '';
    document.getElementById('bigCardContainer').classList.remove('d-none');
    bigCard.innerHTML = templateCreateBigCard(i);
    document.body.classList.add('overflow-hidden');
    */
 
}

function templateCreateBigCard(i) {
    return `
        <div class="bigCard-header">
            <h2 id="card-name-${i}" class="card-name">Test</h2>
            <h2 id="card-id-${i}" class="card-id">ID</h2>
        </div>

        <div class="bigCard-typ">
            <p>Type-1</p>
            <p>Type-2</p>
        </div>

        <div class="bigCard-pokeImg">
            <img id="pokemon-img-${i}" class="pokemon-img">
        </div>

        <div class="bigCard-pokeImg">
            <img id="pokemon-img-${i}" class="pokemon-img">
        </div>

        <div id="bigCard-bottom">
            <div id="progress-row">
                <p id="stat-name">HP</p>
                <p id="stat-value">42</p>
                <div id="progress-bar">

                </div>
            </div>

            <div id="progress-row">
                <p id="stat-name">Attack</p>
                <p id="stat-value">42</p>
                <div id="progress-bar">

                </div>
            </div>

            <div id="progress-row">
                <p id="stat-name">Defense</p>
                <p id="stat-value">42</p>
                <div id="progress-bar">

                </div>
            </div>

            <div id="progress-row">
                <p id="stat-name">Sp. Atk</p>
                <p id="stat-value">42</p>
                <div id="progress-bar">

                </div>
            </div>

            <div id="progress-row">
                <p id="stat-name">Sp. Def</p>
                <p id="stat-value">42</p>
                <div id="progress-bar">

                </div>
            </div>

            <div id="progress-row">
                <p id="stat-name">Speed</p>
                <p id="stat-value">42</p>
                <div id="progress-bar">

                </div>
            </div>
        </div>

        
    `;
}

function setBackground(i) {
    if (allPokemon[i]['types']['0']['type']['name'] == 'grass') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(62, 181, 62)";      
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'fire') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(222, 56, 56)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'water') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(82, 82, 228)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'bug') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(231, 176, 104)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'normal') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(202, 200, 187)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'poison') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(202, 200, 187)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'electric') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(222, 222, 85)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'ground') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(147, 66, 66)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'fairy') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(255, 33, 255)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'fighting') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(97, 95, 95)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'psychic') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(216, 133, 247)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'rock') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(92, 59, 59)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'ghost') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(77, 77, 255)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'dragon') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(173, 173, 173)";
    }

    if (allPokemon[i]['types']['0']['type']['name'] == 'ice') {
        document.getElementById(`pokedex-${i}`).style.backgroundColor = "rgb(200,233,233)";
    }
}

function searchPokemon() {
    let search = document.getElementById('searchInputField').value;
    search = search.toLowerCase();
    document.getElementById('card-box').innerHTML = "";

    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemon[i]['name'].toLowerCase().includes(search)) {
            renderPokemonInfo(i);
            setBackground(i);
        }
    }
}