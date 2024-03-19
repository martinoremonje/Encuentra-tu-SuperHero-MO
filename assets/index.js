$(document).ready(function(){
   $('.btn-primary').on('click', function(event){
    event.preventDefault();
    let inputUser = $('.input2').val();
    let regExp = /^-?\d+$/;
    if(regExp.test(inputUser) && Number(inputUser) > 0 && Number(inputUser) < 733){
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
                    <img src="${res.image.url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${res.name}</h5>
                      
                      <p class="card-text">Conexiones: ${res.connections['group-affiliation']}</p>
                      <p class="card-text">Publisher: ${res.biography.publisher}</p>
                      <hr>
                      <p class="card-text"><small class="text-body-secondary">Race: ${res.appearance.race}</small></p>
                      <hr>
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
   $(".btn-outline-secondary").on("click", function(event){
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
                $('.input2').val(`${res.results[0].id}`)
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
                      <img src="${res.results[0].image.url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">Nombre: ${res.results[0].name}</h5>
                        
                        <p class="card-text">Conexiones: ${res.results[0].connections['group-affiliation']}</p>
                        <p class="card-text">Publisher: ${res.results[0].biography.publisher}</p>
                        <hr>
                        <p class="card-text"><small class="text-body-secondary">Race: ${res.results[0].appearance.race}</small></p>
                        <hr>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
                <div id="chartContainer" class="col-xl-6 col-sm-12" style="height: 300px; width: 50%;"></div>`); 
                
                if(res.results[0].powerstats.power == "null" && res.results[0].powerstats.combat == "null"){             
                  $("#chartContainer").html("<h2 class='text-center'>Stats Unknown</h2>");
                  $('#chartContainer').addClass('animated-card');
                } else{
                  $("#chartContainer").CanvasJSChart(options);
                }
                
                $('.card').addClass('animated-card');
              } else{
                alert("Nombre not found")
                $('.input1').val("")
              }
            },
            error: function () {
                alert("Nombre not found")
              }
        });
       
    } else{
        alert("Ingrese un Nombre Valido")
        $('.input1').val("")
    }
   })
})

