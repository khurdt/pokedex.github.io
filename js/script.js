
//IIFE function
let pokemonRepository = (function () {

  let pokemonList = [];
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150',
      modalContainer = $('#modal-container'),
      loading = $('#loading');

      console.log(pokemonList)

  //loading gif
  function showLoading() {
    loading.addClass('display');
  };

  function hideLoading() {
    loading.removeClass('display');
  };

  //creates list of buttons as a child of a div, with CSS styles, and with an Event Listener
  function addList(pokemon) {
    let container = $('.pokemon-app');
    let listPokemon = $('<li></li>');
    let pokemonImage = $('<img style="width:30%">');
    pokemonImage.attr('src', pokemon.imageUrl);
    let button = $('<button class="btn button">' + pokemon.name.toUpperCase() + '</button>');


    button.append(pokemonImage);
    listPokemon.append(button);
    container.append(listPokemon);

    button.on('click', function() {
      showDetails(pokemon);
      showModal(pokemon);
     });
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
        for (i = 0; i < details.types.length; i++) {
          if (details.types.length === 2) {
          typeString = '';
          pokemon.type = typeString.concat(details.types[0].type.name + ', ' + details.types[1].type.name);
          }else {
          pokemon.type = details.types[i].type.name;
          }
        };
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
          pokemon.size = ('Gigantic');
        } else if (pokemon.height <= 159 && pokemon.height >= 120) {
          pokemon.size = ('Huge');
        } else if (pokemon.height <= 119 && pokemon.height >= 80) {
          pokemon.size = ('Really Big');
        } else if (pokemon.height <= 79 && pokemon.height >= 40) {
          pokemon.size = ('Big');
        } else if (pokemon.height <= 39 && pokemon.height >= 15) {
          pokemon.size = ('Medium');
        } else if (pokemon.height <= 14 && pokemon.height >= 9) {
          pokemon.size = ('Average');
        } else if (pokemon.height <= 8 && pokemon.height >= 0) {
          pokemon.size = ('Small');
        }
        showModal(pokemon);
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
    let detailsList = $('<li class="details-list"></li>');

    let pokemonInfo = $('<p>Type: ' + pokemon.type + '</p>' +
                        '<p>Height: ' + pokemon.height + '</p>' +
                        '<p>Weight: ' + pokemon.weight + '</p>' +
                        '<p>Size: ' + pokemon.size + '</p>');

    detailsList.append(pokemonInfo);
    modalTitle.append(pokemonTitle);
    modalBody.append(pokemonImage)
    modalBody.append(detailsList);

    $('#modal-container').modal();
}


  function add(pokemon) {
      pokemonList.push(pokemon);
  };

  function getAll() {
      return pokemonList;
  };

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
  searchForm.on('submit', function (event) {
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
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addList(pokemon);
  });
});

//ajax call of the API
  // function loadList() {
  //   showLoading();
  //   $.ajax(apiUrl, {
  //     method: 'GET',
  //     dataType: 'json',
  //     timeout: 5000
  //   }).done(function (json) {
  //     let results = json.results;
  //     $.each(results, function (i, item) {
  //       let pokemon = {
  //         name: item.name,
  //         detailsUrl: item.url
  //       }
  //       add(pokemon);
  //       hideLoading();
  //     });
  //   }).fail(function(err) {
  //     console.log('Caught an error' + err.statusText);
  //   });
  // }
