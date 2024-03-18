$(document).ready(function(){
   $('button').on('click', function(){
    let inputUser = $('input').val();
    let regExp = /^-?\d+$/;
    if(regExp.test(inputUser) && Number(inputUser) > 0 && Number(inputUser) < 733){
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/4905856019427443/${inputUser}`,
            dataType: "json",
            success: function(res){
              var options = {
                title: {
                  text:`Estadisticas de Poder de ${res.name}`
                },
                  theme: "light2",
                animationEnabled: true,
                data: [{
                  type: "pie",
                  startAngle: 40,
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
                $('input').val("")
                $(".image-div").html(`<div class="d-flex container-fluid"><div class="col-6">
                <h3 class="px-2 text-center">SuperHero Encontrado</h3>
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
              <div id="chartContainer" style="height: 300px; width: 50%;"></div>`); $("#chartContainer").CanvasJSChart(options);
            },
            error: function (err) {
                console.log(err)
              }
        });
       
    } else{
        alert("Ingrese un Numero Valido")
        $('input').val("")
    }
   })
})

