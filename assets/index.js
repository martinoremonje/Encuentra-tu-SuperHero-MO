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
                      <h5 class="card-title">${res.name}</h5>
                      
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
              <div class="col-6" style="width:50%; height: 300px; background-color: black">
                <h3 class="text-center" style="color: white">Estadisticas de Poder de ${res.name}</h3>
              </div>`)
            },
            error: function (err) {
                console.log(err)
              }
        })
    } else{
        alert("Ingrese un Numero Valido")
        $('input').val("")
    }
   })
})

