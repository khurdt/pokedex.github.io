//IIFE function
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let loading = $('#loading');

  //loading gif
  function showLoading() {
    loading.addClass('display');
  }

  function hideLoading() {
    loading.removeClass('display');
  }

  function loadList() {
    showLoading();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        }
        add(pokemon);
        // console.log(pokemon);
        hideLoading();
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    showLoading();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      //gets both types from the array called 'types'
      for (let i = 0; i < details.types.length; i++) {
        if (details.types.length === 2) {
          let typeString = '';
          pokemon.type = typeString.concat(details.types[0].type.name + ' / ' + details.types[1].type.name);
        } else {
          pokemon.type = details.types[i].type.name;
        }
      }
      hideLoading();
    }).catch(function (e) {
      console.error(e);
    })
  }

  //gets data from each item in the pokemon array and sends it to the HTML
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //gets size from height data
      if (pokemon.height >= 160) {
        pokemon.size = 'Gigantic';
      } else if (pokemon.height <= 159 && pokemon.height >= 120) {
        pokemon.size = 'Huge';
      } else if (pokemon.height <= 119 && pokemon.height >= 80) {
        pokemon.size = 'Really Big';
      } else if (pokemon.height <= 79 && pokemon.height >= 40) {
        pokemon.size = 'Big';
      } else if (pokemon.height <= 39 && pokemon.height >= 15) {
        pokemon.size = 'Medium';
      } else if (pokemon.height <= 14 && pokemon.height >= 9) {
        pokemon.size = 'Average';
      } else if (pokemon.height <= 8 && pokemon.height >= 0) {
        pokemon.size = 'Small';
      }
      showModal(pokemon);
    });
  }

  //creates list of buttons as a child of a div, with CSS styles, and with an Event Listener
  function addList(pokemon) {
    loadDetails(pokemon).then(function () {
      let container = $('.pokemon-app');
      let listPokemon = $('<li></li>');

      let pokemonImage = $('<img alt="Image of Pokemon" src="' + pokemon.imageUrl + '">');
      pokemonImage.addClass('img-fluid');

      let pokemonName = pokemon.name.toUpperCase();

      let button = $('<button></button>');
      button.addClass('btn button')

      button.append(pokemonName);
      button.append(pokemonImage);
      listPokemon.append(button);
      container.append(listPokemon);

      button.on('click', function () {
        showDetails(pokemon);
        showModal(pokemon);
      });
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let pokemonTitle = $('<h1 class="text-capitalize">' + pokemon.name + '</h1>')
    let pokemonImage = $('<img class="modal-img" style="width:30%">');
    pokemonImage.attr('src', pokemon.imageUrl);


    //display details in  a grid
    let detailsList = $('<li></li>');
    detailsList.addClass('details-list');
    let pokemonType = $('<p>' + pokemon.type + '</p>');
    pokemonType.addClass('type-info');
    let pokemonInfo = $('<p class="modal-info">Size: ' + pokemon.size + '</p>' +
      '<p class="modal-info">Height: ' + pokemon.height + '</p>' +
      '<p class="modal-info">Weight: ' + pokemon.weight + '</p>');

    modalTitle.append(pokemonTitle);
    modalBody.append(pokemonType);
    modalBody.append(pokemonImage)
    modalBody.append(detailsList);
    detailsList.append(pokemonInfo);

    $('#modal-container').modal();
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addList: addList,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  //Search//
  let searchForm = $('.pokemon-search')
  searchForm.on('input', function (event) {
    event.preventDefault();
    let searchString = $('#myInput').val().toLowerCase();
    $('.pokemon-app').empty('');
    if (searchString === '') {
      pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addList(pokemon);
      });
    } else {
      pokemonRepository.getAll().forEach(function (pokemon) {
        if (pokemon.name.toLowerCase().indexOf(searchString) > -1) {
          pokemonRepository.addList(pokemon);
        }
      });
    }
  });
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addList(pokemon);
  });
});
