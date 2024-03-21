$(".idBtn").addClass("d-none");
$(".siguiente").addClass("d-none");
$(".atras").addClass("d-none");
$(document).ready(function(){
  $(".idBtn").on("click", function(){
    var currentId = parseInt($('.input2').data('current-id'), 10);
    if(isNaN(currentId)){
      alert('Aun no se agrega ID al database ↨')
    } else{
      alert(`Esta es la ID: ${currentId}.`)
    }
  })
   $('.btn-primary').on('click', function(event){
    event.preventDefault();
    let inputUser = $('.input2').val();
    let regExp = /^-?\d+$/;
    $('.input2').data('current-id', inputUser)
    if(regExp.test(inputUser) && Number(inputUser) > 0 && Number(inputUser) < 733){
      $(".idBtn").removeClass("d-none");
      $(".siguiente").removeClass("d-none");
      $(".atras").removeClass("d-none");
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/4905856019427443/${inputUser}`,
            dataType: "json",
            success: function(res){
              
              let tipoHeroe = "";
              if(res.biography.alignment == "bad"){
                tipoHeroe = "Villan"
              } else if(res.biography.alignment == "good"){
                tipoHeroe = "Heroe"
              } else{
                tipoHeroe = "Hero/Villan"
              };
              var options = {
                title: {
                  text:`Estadisticas de Poder de ${res.name}`
                },
                  theme: "light2",
                animationEnabled: true,
                data: [{
                  type: "pie",
                  startAngle: 60,
                  toolTipContent: "<b>{label}</b>: {y}%",
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabelFontSize: 12,
                  indexLabel: "{label} - {y}%",
                  dataPoints: [
                    { y: +res.powerstats.combat, label: "Combat" },
                    { y: +res.powerstats.durability, label: "Durability" },
                    { y: +res.powerstats.intelligence, label: "Intelligence" },
                    { y: +res.powerstats.power, label: "Power" },
                    { y: +res.powerstats.speed, label: "Speed" },
                    { y: +res.powerstats.strength, label: "Strength" }
                  ]
                }]
              };
                console.log(res)
                $('.input2').val("")
                $(".image-div").html(`<div class="row container-fluid"><div class="col-xl-6 col-sm-12">
                <h3 class="px-2 text-center">${tipoHeroe} Encontrado</h3>
                <div class="card mb-3" style="max-width: 600px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${res.image.url}" class="img-fluid rounded-start" alt="Hero/Villan IMG">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${res.name}</h5>
                      
                      <h6 class="card-text">Conexiones: ${res.connections['group-affiliation']}</h6>
                      <div class="py-4 px-4 cards-p">
                      <p class="card-text">Publisher: ${res.biography.publisher}</p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Ocupacion: ${res.work.occupation}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Primera aparicion: ${res.biography['first-appearance']}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Altura: ${res.appearance.height}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Peso: ${res.appearance.weight}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Alianza: ${res.connections.relatives}</small></p>
                      </div>
                      
                    </div>
                  </div>
                </div>
               </div>
              </div>
              <div id="chartContainer" class="col-xl-6 col-sm-12" style="height: 300px; width: 50%;"></div>`); 
              
              if(res.powerstats.power == "null" && res.powerstats.combat == "null"){             
                $("#chartContainer").html("<h2 class='text-center'>Stats Unknown</h2>");
                $('#chartContainer').addClass('animated-card');
              } else{
                $("#chartContainer").CanvasJSChart(options);
              }
              
              $('.card').addClass('animated-card');
              $('h3').addClass('animated-card')
            },
            error: function (err) {
                console.log(err)
              }
        });
       
    } else{
        alert("Ingrese un Numero Valido")
        $('.input2').val("")
    }
   });
   $(".buscador").on("click", function(event){
    event.preventDefault()
    let heroName = $('.input1').val();
    heroName = heroName.toLowerCase();
    if(heroName){
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/4905856019427443/search/${heroName}`,
            dataType: "json",
            success: function(res){
             
              if(res.response != "error"){  
                $(".idBtn").removeClass("d-none");
                $(".siguiente").removeClass("d-none");
                $(".atras").removeClass("d-none");
                let nameId = res.results[0].id;
                $('.input2').data('current-id', nameId);
                console.log(res)
                let tipoHeroe = "";
                if(res.results[0].biography.alignment == "bad"){
                  tipoHeroe = "Villan"
                } else if(res.results[0].biography.alignment == "good"){
                  tipoHeroe = "Heroe"
                };
                var options = {
                  title: {
                    text:`Estadisticas de Poder de ${res.results[0].name}`
                  },
                    theme: "light2",
                  animationEnabled: true,
                  data: [{
                    type: "pie",
                    startAngle: 60,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 12,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [
                      { y: +res.results[0].powerstats.combat, label: "Combat" },
                      { y: +res.results[0].powerstats.durability, label: "Durability" },
                      { y: +res.results[0].powerstats.intelligence, label: "Intelligence" },
                      { y: +res.results[0].powerstats.power, label: "Power" },
                      { y: +res.results[0].powerstats.speed, label: "Speed" },
                      { y: +res.results[0].powerstats.strength, label: "Strength" }
                    ]
                  }]
                };
                  $('.input1').val("")
                  $(".image-div").html(`<div class="row container-fluid"><div class="col-xl-6 col-sm-12">
                  <h3 class="px-2 text-center">${tipoHeroe} Encontrado</h3>
                  <div class="card mb-3" style="max-width: 600px;">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${res.results[0].image.url}" class="img-fluid rounded-start" alt="Hero/Villan IMG">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">Nombre: ${res.results[0].name}</h5>
                    
                    <h6 class="card-text">Conexiones: ${res.results[0].connections['group-affiliation']}</h6>
                    <div class="py-4 px-4 cards-p">
                    <p class="card-text">Publisher: ${res.results[0].biography.publisher}</p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Ocupacion: ${res.results[0].work.occupation}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Primera aparicion: ${res.results[0].biography['first-appearance']}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Altura: ${res.results[0].appearance.height}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Peso: ${res.results[0].appearance.weight}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Alianza: ${res.results[0].connections.relatives}</small></p>
                    </div>
                    
                  </div>
                </div>
                    </div>
                  
                 </div>
                </div>
                
                <div id="chartContainer" class="" style="height: 300px; width: 50%;">
                
                </div>`); 
                
                
                if(res.results[0].powerstats.power == "null" && res.results[0].powerstats.combat == "null"){             
                  $("#chartContainer").html("<h2 class='text-center'>Stats Unknown</h2>");
                  $('#chartContainer').addClass('animated-card');
                } else{
                  $("#chartContainer").CanvasJSChart(options);
                }
                
                $('.card').addClass('animated-card');
                $('h3').addClass('animated-card')
              } else{
                alert("Nombre not found")
                $('.input1').val("")
              }
            },
            error: function (err) {
                alert(err)
              }
        });
       
    } else{
        alert("Ingrese un Nombre Valido")
        $('.input1').val("")
    }
   });
   $(".siguiente").on("click", function(e){
    e.preventDefault()
    var currentId = parseInt($('.input2').data('current-id'), 10) + 1;
    console.log(currentId)
    if(currentId > 0 && currentId < 733){
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/4905856019427443/${currentId}`,
            dataType: "json",
            success: function(res){
                $('.input2').data('current-id', currentId);
                console.log(currentId)
              let tipoHeroe = "";
              if(res.biography.alignment == "bad"){
                tipoHeroe = "Villan"
              } else if(res.biography.alignment == "good"){
                tipoHeroe = "Heroe"
              } else{
                tipoHeroe = "Hero/Villan"
              };
              var options = {
                title: {
                  text:`Estadisticas de Poder de ${res.name}`
                },
                  theme: "light2",
                animationEnabled: true,
                data: [{
                  type: "pie",
                  startAngle: 60,
                  toolTipContent: "<b>{label}</b>: {y}%",
                  showInLegend: "true",
                  legendText: "{label}",
                  indexLabelFontSize: 12,
                  indexLabel: "{label} - {y}%",
                  dataPoints: [
                    { y: +res.powerstats.combat, label: "Combat" },
                    { y: +res.powerstats.durability, label: "Durability" },
                    { y: +res.powerstats.intelligence, label: "Intelligence" },
                    { y: +res.powerstats.power, label: "Power" },
                    { y: +res.powerstats.speed, label: "Speed" },
                    { y: +res.powerstats.strength, label: "Strength" }
                  ]
                }]
              };
                console.log(res)
                $('.input2').val("")
                $(".image-div").html(`<div class="row container-fluid"><div class="col-xl-6 col-sm-12">
                <h3 class="px-2 text-center">${tipoHeroe} Encontrado</h3>
                <div class="card mb-3" style="max-width: 600px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${res.image.url}" class="img-fluid rounded-start" alt="Hero/Villan IMG">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${res.name}</h5>
                      
                      <h6 class="card-text">Conexiones: ${res.connections['group-affiliation']}</h6>
                      <div class="py-4 px-4 cards-p">
                      <p class="card-text">Publisher: ${res.biography.publisher}</p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Ocupacion: ${res.work.occupation}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Primera aparicion: ${res.biography['first-appearance']}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Altura: ${res.appearance.height}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Peso: ${res.appearance.weight}</small></p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Alianza: ${res.connections.relatives}</small></p>
                      </div>
                      
                    </div>
                  </div>
                </div>
               </div>
              </div>
              <div id="chartContainer" class="col-xl-6 col-sm-12" style="height: 300px; width: 50%;"></div>`); 
              
              if(res.powerstats.power == "null" && res.powerstats.combat == "null"){             
                $("#chartContainer").html("<h2 class='text-center'>Stats Unknown</h2>");
                $('#chartContainer').addClass('animated-card');
              } else{
                $("#chartContainer").CanvasJSChart(options);
              }
              
              $('.card').addClass('animated-card');
              $('h3').addClass('animated-card')
            },
            error: function (err) {
                console.log(err);
            }
        });
    } else{
        alert("Personajes no Encontrados");
    }
});
$(".atras").on("click", function(e){
  e.preventDefault()
  var currentId = parseInt($('.input2').data('current-id'), 10) - 1;
  console.log(currentId)
  if(currentId > 0 && currentId < 733){
      $.ajax({
          type: "GET",
          url: `https://www.superheroapi.com/api.php/4905856019427443/${currentId}`,
          dataType: "json",
          success: function(res){
              $('.input2').data('current-id', currentId);
              console.log(currentId)
            let tipoHeroe = "";
            if(res.biography.alignment == "bad"){
              tipoHeroe = "Villan"
            } else if(res.biography.alignment == "good"){
              tipoHeroe = "Heroe"
            } else{
              tipoHeroe = "Hero/Villan"
            };
            var options = {
              title: {
                text:`Estadisticas de Poder de ${res.name}`
              },
                theme: "light2",
              animationEnabled: true,
              data: [{
                type: "pie",
                startAngle: 60,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 12,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                  { y: +res.powerstats.combat, label: "Combat" },
                  { y: +res.powerstats.durability, label: "Durability" },
                  { y: +res.powerstats.intelligence, label: "Intelligence" },
                  { y: +res.powerstats.power, label: "Power" },
                  { y: +res.powerstats.speed, label: "Speed" },
                  { y: +res.powerstats.strength, label: "Strength" }
                ]
              }]
            };
              console.log(res)
              $('.input2').val("")
              $(".image-div").html(`<div class="row container-fluid"><div class="col-xl-6 col-sm-12">
              <h3 class="px-2 text-center">${tipoHeroe} Encontrado</h3>
              <div class="card mb-3" style="max-width: 600px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${res.image.url}" class="img-fluid rounded-start" alt="Hero/Villan IMG">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Nombre: ${res.name}</h5>
                    
                    <h6 class="card-text">Conexiones: ${res.connections['group-affiliation']}</h6>
                    <div class="py-4 px-4 cards-p">
                    <p class="card-text">Publisher: ${res.biography.publisher}</p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Ocupacion: ${res.work.occupation}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Primera aparicion: ${res.biography['first-appearance']}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Altura: ${res.appearance.height}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Peso: ${res.appearance.weight}</small></p>
                    <hr>
                    <p class="card-text"><small class="text-body-secondary">Alianza: ${res.connections.relatives}</small></p>
                    </div>
                    
                  </div>
                </div>
              </div>
             </div>
            </div>
            <div id="chartContainer" class="col-xl-6 col-sm-12" style="height: 300px; width: 50%;"></div>`); 
            
            if(res.powerstats.power == "null" && res.powerstats.combat == "null"){             
              $("#chartContainer").html("<h2 class='text-center'>Stats Unknown</h2>");
              $('#chartContainer').addClass('animated-card');
            } else{
              $("#chartContainer").CanvasJSChart(options);
            }
            
            $('.card').addClass('animated-card');
            $('h3').addClass('animated-card')
          },
          error: function (err) {
              console.log(err);
          }
      });
  } else{
      alert("Personajes no Encontrados");
  }
});

  })


