    
  // If we need to use custom DOM library, let's save it to $$ variable:
  var $$ = Dom7;
  var elegida=0;
  var separador = "-";// un espacio en blanco
  var limite    = 2;
  var array=0;
  var ciudadelegida=0;
  var provinciaelegida=0;
  var nombre=0;
  var opciones="";
  var provincia=0;
  var lista = [];






  var app = new Framework7({
      // App root element
      root: '#app',
      // App Name
      name: 'My App',
      // App id
      id: 'com.myapp.test',
      // Enable swipe panel
      panel: {
        swipe: 'left',
      },
      // Add default routes
      routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      },
      ]
    });

  var mainView = app.views.create('.view-main');

  var ciudad;


  // Handle Cordova Device Ready Event
  $$(document).on('deviceready', function() {
    console.log("Device is ready!");

  });


  // Option 1. Using one 'page:init' handler for all pages
  $$(document).on('page:init', function (e) {
      // Do something here when page loaded and initialized
      console.log(e);
    })


  $$(document).on('page:init', '.page[data-name="index"]', function (e) {

    var url="https://ws.smn.gob.ar/map_items/forecast/1";




    app.request.json(url, function(datosDevueltos) {                


      for (i=0; i<datosDevueltos.length; i++) {
       nombre = datosDevueltos[i].name;
       provincia = datosDevueltos[i].province;
       lista.push(provincia+"-"+nombre);
       lista.sort();

     };

     for (i=0; i<=lista.length; i++) {
      opciones = "<option value="+i+">"+lista[i]+"</option>";
      $$('#ciudades').append(opciones);
     }
   });




    $$("#boton").on('click', function() {
     elegida = $$("#seleccionado").text();
     array = elegida.split(separador, limite);
     provinciaelegida = array[0];
     ciudadelegida = array[1];
   });


  })


  // Option 2. Using live 'page:init' event handlers for each page
  $$(document).on('page:init', '.page[data-name="about"]', function (e) {
      // Do something here when page with data-name="about" attribute loaded and initialized
      console.log(e);
      
      var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
      var ciudad;
      app.request.json(url, function(datosDevueltos) {                


        for (i=0; i<datosDevueltos.length; i++) {
          if (datosDevueltos[i].name == ciudadelegida && datosDevueltos[i].province == provinciaelegida) {
            ciudad = datosDevueltos[i].name;
            $$('#localidad').html(ciudad);
            provincia = datosDevueltos[i].province;
            $$('#provincia').html("Provincia de "+provincia);

            temp_ma = datosDevueltos[i].weather.morning_temp;
            $$('#temp_m').html(temp_ma+"º");
            desc_ma = datosDevueltos[i].weather.morning_desc;
            $$('#desc_m').html(desc_ma);
            icono_id_ma = datosDevueltos[i].weather.morning_id;
            icono_ma = "http://l.yimg.com/a/i/us/we/52/"+icono_id_ma+".gif";
            $$('#img_m').attr('src', icono_ma);

            temp_ta = datosDevueltos[i].weather.afternoon_temp;
            $$('#temp_t').html(temp_ta+"º");
            desc_ta = datosDevueltos[i].weather.afternoon_desc;
            $$('#desc_t').html(desc_ta);
            icono_id_ta = datosDevueltos[i].weather.afternoon_id;
            icono_ta = "http://l.yimg.com/a/i/us/we/52/"+icono_id_ta+".gif";
            $$('#img_t').attr('src', icono_ta);

          }



        }



      });

      $$(".icon icon-back").on('click', function(){
        elegida=0;
        array=0;
        provinciaelegida=0;
        ciudadelegida=0;

      })
    })

















