//----Global vars----
var selectedSex = "Hombres";
var selectedProvince = "ALAJUELA";
var selectedProvinceId = 2;
var selectedCanton = "SAN CARLOS";
var selectedCantonId = 30;
var selectedYear = 2000;
//----Responses for every view
var responseBars = "0";
var responsePie = "0";
var responseDonut = "0";

//----Data for every view
var valuesBars1 = [];
var labelsBars1 = [];
var valuesBars2 = [];
var labelsBars2 = [];

var valuesPie1 = [];
var valuesPie2 = [];
var labelsPie = [];

var valuesDonut = [];
var labelsDonut = [];


//-----Listeners
//document.getElementById("yearSelection").addEventListener("change",selectYear);
//document.getElementById("sexSelection").addEventListener("change",selectSex);

function changeProvinceName(province,provinceId, canton, cantonId){
  document.getElementById("cantonName").innerHTML = canton
  document.getElementById("provinceName").innerHTML = province
  selectedProvince = province;
  selectedProvinceId = provinceId;
  selectedCanton = canton;
  selectedCantonId = cantonId;
  makePosts();
}
function selectYear(){
  selectedYear = document.getElementById("yearSelection").value;
  makePosts();
}
function selectSex(){
  selectedSex = document.getElementById("sexSelection").value;
  makePosts();
}
//----Invokers
function makeGets(){
  httpGetBars();
  httpGetPie();
  httpGetDonut();
}
function makePosts(){
  httpPostBars();
  httpPostPie();
  httpPostDonut();
}

//-----------HTTP-----------------------
//--BARS
function httpGetBars()
{
  var path = "http://localhost:8080/bars";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", path, false ); // false for synchronous request
  xmlHttp.send( null );
  responseBars = xmlHttp.responseText;
  parseBarsData();
}

function httpPostBars()
{
  var path = "http://localhost:8080/bars"
  var request = new XMLHttpRequest();
  request.open("POST", path, true); // true = asynchronous
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  var text= '{"year":"'+selectedYear+'","province":"'+selectedProvince+'"}';
  request.send ( text );
  request = null;
}
//--PIE
function httpGetPie()
{
  var path = "http://localhost:8080/pie";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", path, false ); // false for synchronous request
  xmlHttp.send( null );
  //console.log("Client: "+xmlHttp.responseText);
  responsePie = xmlHttp.responseText;
  parsePieData();
}

function httpPostPie()
{
  var path = "http://localhost:8080/pie"
  var request = new XMLHttpRequest();
  request.open("POST", path, true); // true = asynchronous
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  var text= '{"year":"'+selectedYear+'","sex":"'+selectedSex+'"}';
  request.send ( text );
  request = null;
}
//--DONUT
function httpGetDonut()
{
  var path = "http://localhost:8080/donut";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", path, false ); // false for synchronous request
  xmlHttp.send( null );
  responseDonut = xmlHttp.responseText;
  parseDonutData();
}

function httpPostDonut()
{
  var path = "http://localhost:8080/donut"
  var request = new XMLHttpRequest();
  request.open("POST", path, true); // true = asynchronous
  request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  var text= '{"year":"'+selectedYear+'"}';
  request.send ( text );
  request = null;
}
//--------Parse Functions-----------
function parseBarsData(){
  var obj = JSON.parse(responseBars);
  valuesBars1 = [];
  labelsBars1 = [];
  valuesBars2 = [];
  labelsBars2 = [];
  for (i in obj) {
    if((obj[i].Condicion).localeCompare("Asegurados") == 0){
      valuesBars1.push(obj[i].Porcentaje);
      labelsBars1.push(obj[i].Sexo);
    }else{
      valuesBars2.push(obj[i].Porcentaje);
      labelsBars2.push(obj[i].Sexo);
    }
  }
  createBarsView();
}
function parsePieData(){
  var obj = JSON.parse(responsePie);
  valuesPie1 = [];
  valuesPie2 = [];
  labelsPie = [];
  for (i in obj) {
    if((obj[i].Condicion).localeCompare("Asegurados") != 0){
      valuesPie1.push(obj[i].Total);
      labelsPie.push(obj[i].Provincia);
    }else{
      valuesPie2.push(obj[i].Total);
    }
  }
  createPieView();
}
function parseDonutData(){
  var obj = JSON.parse(responseDonut);
  valuesDonut = [];
  labelsDonut = [];
  for (i in obj) {
    valuesDonut.push(obj[i].Total);
    labelsDonut.push(obj[i].Condicion);
  }
  createDonutView();
}
//-----------GRAPHICS-------------------
cantonNumbers = [1,  2,  3,  4,  5,  6,  7,  8,  9,  10,  11,  12,  13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,  64,  65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,  78,  79,  80,  81]
var data = [{
    type: "choroplethmapbox",
    name: "Provincias de Costa Rica",
    geojson: "http://localhost:8080/cantones.json",
    locations: ["SAN JOSE", "ESCAZU", "DESAMPARADOS", "PURISCAL", "TARRAZU", "ASERRI", "MORA", "GOICOECHEA", "SANTA ANA", "ALAJUELITA", "VAZQUEZ DE CORONADO", "ACOSTA", "TIBAS", "MORAVIA", "MONTES DE OCA", "TURRUBARES", "DOTA", "CURRIDABAT", "PEREZ ZELEDON", "LEON CORTES",

      "ALAJUELA", "SAN RAMON", "GRECIA", "RIO CUARTO", "SAN MATEO", "ATENAS", "NARANJO", "PALMARES", "POAS", "OROTINA", "SAN CARLOS", "ALFARO RUIZ", "VALVERDE VEGA", "UPALA", "LOS CHILES", "GUATUSO",

      "CARTAGO", "PARAISO", "LA UNION", "JIMENEZ", "TURRIALBA", "ALVARADO", "OREAMUNO", "EL GUARCO",

      "HEREDIA", "HEREDIA_", "BARVA", "SANTO DOMINGO", "SANTA BARBARA", "SAN RAFAEL", "SAN ISIDRO", "BELEN", "FLORES", "SAN PABLO", "SARAPIQUI",

      "LIBERIA", "NICOYA", "SANTA CRUZ", "BAGACES", "CARRILLO", "CAÑAS", "ABANGARES", "TILARAN", "NANDAYURE", "LA CRUZ", "HOJANCHA",

      "PUNTARENAS", "PUNTARENAs", "ISLA DEL COCO", "ISLA NUEZ", "ISLA CABO BLANCO", "ISLA CABUYA", "ISLA TORTUGA", "ISLA ALCATRAZ", "ISLAS NEGRITOS", "ISLA NEGRITOS", "ISLA JESUITA", "ISLA CEDROS", "ISLA MUERTOS", "ISLA SAN LUCAS", "ISLA VENADO", "ISLA CABALLO", "ISLA BEJUCO", "ISLA CHIRA", "ESPARZA", "BUENOS AIRES", "MONTES DE ORO", "OSA", "AGUIRRE", "GOLFITO", "COTO BRUS", "PARRITA", "CORREDORES", "GARABITO",

      "LIMON", "POCOCI", "SIQUIRRES", "TALAMANCA", "MATINA", "GUACIMO"],
    // 1345750
    z: [0, 1000, 200, 800, 100, 1500, 600, 700, 2000, 400, 1000, 125, 1000, 2000, 300, 900, 1200, 1900, 3000, 1100,

        10000, 8000, 9000, 7500, 10000, 8700, 8200, 9100, 8600, 8000, 7800, 8900, 9700, 9200, 8700, 8300,

        5000, 7000, 5800, 6300, 5100, 6700, 5400, 6000,

        4000, 4000, 4800, 3500, 4100, 3000, 3700, 5000, 4400, 3200, 6800,

        5500, 5000, 6200, 6850, 4500, 5800, 4750, 6400, 5900, 7200, 6550,

        7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 6400, 7250, 6000, 7900, 5000, 6100, 5000, 4468, 5500, 7500,

        1500, 2700, 1650, 500, 800, 400],

    zmin: 0, zmax: 10000,
    colorscale: "Rainbow",
    hoverinfo: "cantonNumbers",
    //autocolorscale:true,
    }];
var layout = {mapbox: {style: "dark", center: {lon: -84.09, lat: 9.93}, zoom: 6.5}, 
                    width: 1000, 
                    height: 450, 
                    margin: {l: 0,t: 0, b: 0},
                    hovermode: 'closest'
                  };
//margin = dict(l = 0, r = 0, t = 0, b = 0)
var config = {mapboxAccessToken: "pk.eyJ1Ijoiam9zdWVnZ3NzNzMiLCJhIjoiY2tkMTA5MHNmMGRiMjJ0bW11NGdqNjljMCJ9.aQToRizI-RvaLRg7SopqrQ"};
Plotly.newPlot('main', data, layout, config).then(gd=>{
  gd.on('plotly_click', d => {
      var pt = (d.points || [])[0]
      switch(pt.location) {
        case 'SAN JOSE':
          changeProvinceName("SAN JOSE",1,pt.location,1);
          break
        case 'ESCAZU':
          changeProvinceName("SAN JOSE",1,pt.location,2);
          break
        case 'DESAMPARADOS':
          changeProvinceName("SAN JOSE",1,pt.location,3);
          break
        case  "PURISCAL":
          changeProvinceName("SAN JOSE",1,pt.location,4);
          break
        case  "TARRAZU":
          changeProvinceName("SAN JOSE",1,pt.location,5);
          break
        case  "ASERRI":
          changeProvinceName("SAN JOSE",1,pt.location,6);
          break
        case  "MORA":
          changeProvinceName("SAN JOSE",1,pt.location,7);
          break
        case  "GOICOECHEA":
          changeProvinceName("SAN JOSE",1,pt.location,8);
          break
        case  "SANTA ANA":
          changeProvinceName("SAN JOSE",1,pt.location,9);
          break
        case  "ALAJUELITA": 
          changeProvinceName("SAN JOSE",1,pt.location,10);
          break
        case  "VAZQUEZ DE CORONADO":
          changeProvinceName("SAN JOSE",1,pt.location,11);
          break
        case  "ACOSTA":
          changeProvinceName("SAN JOSE",1,pt.location,12);
          break
        case  "TIBAS":
          changeProvinceName("SAN JOSE",1,pt.location,13);
          break
        case  "MORAVIA":
          changeProvinceName("SAN JOSE",1,pt.location,14);
          break
        case  "MONTES DE OCA":
          changeProvinceName("SAN JOSE",1,pt.location,15);
          break
        case  "TURRUBARES":
          changeProvinceName("SAN JOSE",1,pt.location,16);
          break
        case  "DOTA":
          changeProvinceName("SAN JOSE",1,pt.location,17);
          break
        case  "CURRIDABAT":
          changeProvinceName("SAN JOSE",1,pt.location,18);
          break
        case  "PEREZ ZELEDON":
          changeProvinceName("SAN JOSE",1,pt.location,19);
          break
        case  "LEON CORTES":
          changeProvinceName("SAN JOSE",1,pt.location,20);
          break
        case "ALAJUELA":
          changeProvinceName("ALAJUELA",2,pt.location,21);
          break
        case "SAN RAMON": 
          changeProvinceName("ALAJUELA",2,pt.location,22);
          break
        case "GRECIA":
          changeProvinceName("ALAJUELA",2,pt.location,23);
          break
        case "RIO CUARTO":
          changeProvinceName("ALAJUELA",2,pt.location,82);
          break
        case "SAN MATEO":
          changeProvinceName("ALAJUELA",2,pt.location,24);
          break
        case "ATENAS":
          changeProvinceName("ALAJUELA",2,pt.location,25);
          break
        case "NARANJO": 
          changeProvinceName("ALAJUELA",2,pt.location,26);
          break
        case "PALMARES": 
          changeProvinceName("ALAJUELA",2,pt.location,27);
          break
        case "POAS":
          changeProvinceName("ALAJUELA",2,pt.location,28);
          break
        case "OROTINA":
          changeProvinceName("ALAJUELA",2,pt.location,29);
          break
        case "SAN CARLOS":
          changeProvinceName("ALAJUELA",2,pt.location,30);
          break
        case "ALFARO RUIZ": 
          changeProvinceName("ALAJUELA",2,pt.location,31);
          break
        case "VALVERDE VEGA":
          changeProvinceName("ALAJUELA",2,pt.location,32);
          break
        case "UPALA":
          changeProvinceName("ALAJUELA",2,pt.location,33);
          break
        case "LOS CHILES":
          changeProvinceName("ALAJUELA",2,pt.location,34);
          break
        case "GUATUSO":
          changeProvinceName("ALAJUELA",2,pt.location,35);
          break
      }
    })
});

//----Pie1------
function createPieView(){
  var allPieValues = [valuesPie1,valuesPie2];
  var ultimateColors = [
    ['rgb(255, 21, 39)', 
     'rgb(44, 134, 223)', 
     'rgb(254, 98, 22)', 
     'rgb(11, 152, 3)', 
     'rgb(30, 250, 18)', 
     'rgb(249, 243, 19)',
     'rgb(236, 46, 222)']
  ];
  var dataPie = [{
    values: allPieValues[0],
    labels: labelsPie,
    type: 'pie',
    name: 'Asegurados',
    marker: {
      colors: ultimateColors[0]
    },
    domain: {
      row: 0,
      column: 0
    },
    hoverinfo: 'label+percent+name',
    textinfo: 'percent'
  },{
    values: allPieValues[1],
    labels: labelsPie,
    type: 'pie',
    name: 'No Asegurados',
    marker: {
      colors: ultimateColors[0]
    },
    domain: {
      row: 0,
      column: 1
    },
    hoverinfo: 'label+percent+name',
    textinfo: 'percent'
  }]
  var layoutPie = {
    title: 'Cantidad de asegurados por Año',
    height: 240,
    width: 500,
    grid:{rows: 1, columns: 2},
    margin: {l: 15,t: 25, b: 15,r: 15}
 };
  Plotly.newPlot('graph1', dataPie, layoutPie);
}
//----Donut------
function createDonutView(){
  var dataDonut = [{
    values: valuesDonut,
    labels: labelsDonut,
    hole: .4,
    type: 'pie'
  }];
  var layoutDonut = {
    title: 'Pais: % Asegurados por Año',
    height: 240,
    width: 340,
    margin: {l: 15,t: 25, b: 15,r: 15}
  };
  Plotly.newPlot('graph3', dataDonut, layoutDonut);
}
//----Bar-----
function createBarsView(){
  var trace1 = {
    x: labelsBars1,
    y: valuesBars1,
    name: 'Asegurados',
    type: 'bar'
  };
  var trace2 = {
    x: labelsBars2,
    y: valuesBars2,
    name: 'No Asegurados',
    type: 'bar'
  };
  var dataBars = [trace1, trace2];
  var layoutBars = {
      title: 'Provincial: % de asegurados por sexo',
      height: 240,
      width: 340,
      margin: {l: 15,t: 25, b: 15,r: 15}
  };  
  Plotly.newPlot('graph4', dataBars,layoutBars);
}
