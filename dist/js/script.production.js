let pokemonRepository=function(){let e=[];function t(){loading.addClass("display")}function n(){loading.removeClass("display")}function o(e){t();let o=e.detailsUrl;return fetch(o).then(function(e){return e.json()}).then(function(t){for(e.imageUrl=t.sprites.front_default,e.height=t.height,e.weight=t.weight,i=0;i<t.types.length;i++)2===t.types.length?(typeString="",e.type=typeString.concat(t.types[0].type.name+" / "+t.types[1].type.name)):e.type=t.types[i].type.name;n()}).catch(function(e){console.error(e)})}function a(e){o(e).then(function(){e.height>=160?e.size="Gigantic":e.height<=159&&e.height>=120?e.size="Huge":e.height<=119&&e.height>=80?e.size="Really Big":e.height<=79&&e.height>=40?e.size="Big":e.height<=39&&e.height>=15?e.size="Medium":e.height<=14&&e.height>=9?e.size="Average":e.height<=8&&e.height>=0&&(e.size="Small"),l(e)})}function l(e){let t=$(".modal-body"),n=$(".modal-title");n.empty(),t.empty();let o=$('<h1 class="text-capitalize">'+e.name+"</h1>"),i=$('<img class="modal-img" style="width:30%">');i.attr("src",e.imageUrl);let a=$("<li></li>");a.addClass("details-list");let l=$("<p>"+e.type+"</p>");l.addClass("type-info");let p=$('<p class="modal-info">Size: '+e.size+'</p><p class="modal-info">Height: '+e.height+'</p><p class="modal-info">Weight: '+e.weight+"</p>");n.append(o),t.append(l),t.append(i),t.append(a),a.append(p),$("#modal-container").modal()}function p(t){e.push(t)}return apiUrl="https://pokeapi.co/api/v2/pokemon/?limit=150",modalContainer=$("#modal-container"),loading=$("#loading"),{add:p,getAll:function(){return e},addList:function(e){o(e).then(function(){let t=$(".pokemon-app"),n=$("<li></li>"),o=$('<img alt="Image of Pokemon" src="'+e.imageUrl+'">');o.addClass("img-fluid"),pokemonName=e.name.toUpperCase();let i=$("<button></button>");i.addClass("btn button"),i.append(pokemonName),i.append(o),n.append(i),t.append(n),i.on("click",function(){a(e),l(e)})})},showDetails:a,loadList:function(){return t(),fetch(apiUrl).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){p({name:e.name,detailsUrl:e.url}),n()})}).catch(function(e){console.error(e)})},loadDetails:o,showModal:l}}();pokemonRepository.loadList().then(function(){$(".pokemon-search").on("input",function(e){e.preventDefault();let t=$("#myInput").val().toLowerCase();$(".pokemon-app").empty(""),""===t?pokemonRepository.getAll().forEach(function(e){pokemonRepository.addList(e)}):pokemonRepository.getAll().forEach(function(e){e.name.toLowerCase().indexOf(t)>-1&&pokemonRepository.addList(e)})}),pokemonRepository.getAll().forEach(function(e){pokemonRepository.addList(e)})});