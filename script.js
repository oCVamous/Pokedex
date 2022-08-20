const url = 'https://pokeapi.co/api/v2/pokemon/';
let allPokemon=[];
let favoritePokemonsIndex=[];


//sessionStorage.setItem("allPokemon",JSON.stringify(allPokemon));
// allPokemon = JSON.parse(sessionStorage.getItem("allPokemon"));
// sessionStorage.setItem("favoritePokemonsIndex",JSON.stringify(favoritePokemonsIndex));
//favoritePokemonsIndex = JSON.parse(sessionStorage.getItem("favoritePokemonsIndex"));

async function loadPokemon() {
    document.getElementById('card-box').innerHTML += '';

    for (let i = 0; i < 20; i++) {
            const pokemon_url = url + (i + 1);
            let response = await fetch(pokemon_url);
            let currentPokemon = await response.json();
            allPokemon.push(currentPokemon);
            renderPokemonInfo(i);
            setBackground(i);
      }
      sessionStorage.setItem("allPokemon",JSON.stringify(allPokemon));
      console.log('Loaded pokemon', allPokemon);

}

async function loadFavoritePokemon(){
  allPokemon = JSON.parse(sessionStorage.getItem("allPokemon"));
  // console.log(allPokemon);
  favoritePokemonsIndex = JSON.parse(sessionStorage.getItem("favoritePokemonsIndex"));
  document.getElementById('card-box').innerHTML += '';

  for (let i=0;i<favoritePokemonsIndex.length;i++ ) {
      renderPokemonInfo(favoritePokemonsIndex[i]);
      changeHeart(favoritePokemonsIndex[i]);
      setBackground(favoritePokemonsIndex[i]);
  }
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
    <div id="pokedex-${i}" class="pokedex bg-${allPokemon[i]['types'][0]['type']['name']}" onclick="renderBigPokemonCard(${i})">
        <div id="one">
            <h2 id="pokemon-name-${i}" class="pokemon-name"></h2>
            <h2 id="pokemon-id-${i}" class="pokemon-id">#</h2>
            <div id="pokemon-attribut-${i}" class="pokemon-attribut-container"></div>
        </div>
        <div id="two">
            <img id="pokemon-img-${i}" class="pokemon-img">
        </div>
        <div id="three" onclick="event.stopPropagation()">
            <img onclick="saveFavoritePokemon(${i})" id="like-img-${i}" style="height:35px"; src="img/favorite-3-128.ico" alt="">
        </div>

    </div>
    `;
}

function saveFavoritePokemon(i) {
    /**
     *     const foo = document.getElementById(`pokedex-${i}`);
        foo.addEventListener('click', (event) => {  
        event.preventDefault();  
        });
     * 
     */

    changeHeart(i);
    favoritePokemonsIndex.push(i);
    sessionStorage.setItem("favoritePokemonsIndex",JSON.stringify(favoritePokemonsIndex));

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
    document.getElementById('bigCardContainer').style.display="block";
    document.getElementById('black_overlay').style.display="block";

    document.getElementById('bigCardContainer').innerHTML += templateCreateBigCard(i);

    document.getElementById("card-name-"+i).innerHTML=allPokemon[i]['name'];
    document.getElementById("card-id-"+i).innerHTML+=allPokemon[i]['id'];
    document.getElementById("bg-pokemon-img-"+i).src = allPokemon[i]['sprites']['other']['dream_world']['front_default'];

    document.getElementById("HP-stat-value-"+i).innerHTML = allPokemon[i].stats[0].base_stat;
    document.getElementById("atk-stat-value-"+i).innerHTML = allPokemon[i].stats[1].base_stat;
    document.getElementById("def-stat-value-"+i).innerHTML = allPokemon[i].stats[2].base_stat;
    document.getElementById("spatk-stat-value-"+i).innerHTML = allPokemon[i].stats[3].base_stat;
    document.getElementById("spdef-stat-value-"+i).innerHTML = allPokemon[i].stats[4].base_stat;
    document.getElementById("spdef-stat-value-"+i).innerHTML = allPokemon[i].stats[5].base_stat;


}

function templateCreateBigCard(i) {
    return `
    <div id="bigCard">
    <div class="bigCard-header">
        <h2 id="card-name-${i}" class="card-name"></h2>
        <h2 id="card-id-${i}" class="card-id">#</h2>
    </div>


    <div class="bigCard-pokeImg">
        <img id="bg-pokemon-img-${i}" class="pokemon-img">
    </div>


    <div id="bigCard-bottom">
        <div id="progress-row">
            <p id="stat-name">HP</p>
            <p id="HP-stat-value-${i}"></p>
            <div id="progress-bar">

            </div>
        </div>

        <div id="progress-row">
            <p id="stat-name">Attack</p>
            <p id="atk-stat-value-${i}"></p>
            <div id="progress-bar">

            </div>
        </div>

        <div id="progress-row">
            <p id="stat-name">Defense</p>
            <p id="def-stat-value-${i}"></p>
            <div id="progress-bar">

            </div>
        </div>

        <div id="progress-row">
            <p id="stat-name">Sp. Atk</p>
            <p id="spatk-stat-value-${i}"></p>
            <div id="progress-bar">

            </div>
        </div>

        <div id="progress-row">
            <p id="stat-name">Sp. Def</p>
            <p id="spdef-stat-value-${i}"></p>
            <div id="progress-bar">

            </div>
        </div>

        <div id="progress-row">
            <p id="stat-name">Speed</p>
            <p id="speed-stat-value-${i}"></p>
            <div id="progress-bar">

            </div>
        </div>
    </div>
    </div>



    `;
}

function getBack(){
  document.getElementById('bigCardContainer').style.display='none';
  document.getElementById('black_overlay').style.display='none';
  const element = document.getElementById("bigCard");
  element.remove();
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

function searchFavoritePokemon(){
  let search = document.getElementById('searchInputField').value;
  search=search.toLowerCase();
  document.getElementById('card-box').innerHTML = "";

  for(let i=0;i<favoritePokemonsIndex.length;i++){
    if (allPokemon[favoritePokemonsIndex[i]]['name'].toLowerCase().includes(search)) {
        renderPokemonInfo(favoritePokemonsIndex[i]);
        changeHeart(favoritePokemonsIndex[i]);
        setBackground(favoritePokemonsIndex[i]);
    }
  }
}
