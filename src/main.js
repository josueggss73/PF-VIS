//----Global vars----
var selectedSex = "Hombres";
var selectedProvince = "ALAJUELA";
var selectedProvinceId = 2;
var selectedCanton = "SAN CARLOS";
var selectedCantonId = 30;
var selectedYear = 2000;
var selectedAge = 1;
var selectedTumor = 1;
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
document.getElementById("yearSelection").addEventListener("change",selectYear);
document.getElementById("sexSelection").addEventListener("change",selectSex);
document.getElementById("ageSelection").addEventListener("change",selectAge);
document.getElementById("tumorSelection").addEventListener("change",selectTumor);

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
function selectAge(){
  selectedAge = document.getElementById("ageSelection").value;
  makePosts();
}
function selectTumor(){
  selectedTumor = document.getElementById("tumorSelection").value;
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

      "ALAJUELA", "SAN RAMON", "GRECIA", "RIO CUARTO", "SAN MATEO", "ATENAS", "NARANJO", "PALMARES", "POAS", "OROTINA", "SAN CARLOS", "ZARCERO", "VALVERDE VEGA", "UPALA", "LOS CHILES", "GUATUSO",

      "CARTAGO", "PARAISO", "LA UNION", "JIMENEZ", "TURRIALBA", "ALVARADO", "OREAMUNO", "EL GUARCO",

      "HEREDIA", "HEREDIA_", "BARVA", "SANTO DOMINGO", "SANTA BARBARA", "SAN RAFAEL", "SAN ISIDRO", "BELEN", "FLORES", "SAN PABLO", "SARAPIQUI",

      "LIBERIA", "NICOYA", "SANTA CRUZ", "BAGACES", "CARRILLO", "CAÑAS", "ABANGARES", "TILARAN", "NANDAYURE", "LA CRUZ", "HOJANCHA",

      "PUNTARENAS", "PUNTARENAs", "ISLA DEL COCO", "ISLA NUEZ", "ISLA CABO BLANCO", "ISLA CABUYA", "ISLA TORTUGA", "ISLA ALCATRAZ", "ISLAS NEGRITOS", "ISLA NEGRITOS", "ISLA JESUITA", "ISLA CEDROS", "ISLA MUERTOS", "ISLA SAN LUCAS", "ISLA VENADO", "ISLA CABALLO", "ISLA BEJUCO", "ISLA CHIRA", "ESPARZA", "BUENOS AIRES", "MONTES DE ORO", "OSA", "AGUIRRE", "GOLFITO", "COTO BRUS", "PARRITA", "CORREDORES", "GARABITO",

      "LIMON", "POCOCI", "SIQUIRRES", "TALAMANCA", "MATINA", "GUACIMO"],
    // 1345750
    z: [0, 1000, 200, 800, 100, 1500, 600, 700, 2000, 400, 1000, 125, 1000, 2000, 300, 900, 1200, 1900, 3000, 1100,

        10000, 8500, 9000, 8000, 9800, 8700, 8200, 9400, 8600, 8000, 9300, 8800, 9750, 9200, 8700, 8300,

        5000, 5650, 5800, 6300, 5400, 6700, 5400, 6000,

        4400, 4400, 4150, 5150, 4800, 4700, 4900, 4000, 5000, 4100, 4600,

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
        case "ZARCERO": 
          changeProvinceName("ALAJUELA",2,"ALFARO RUIZ",31);
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
        case "CARTAGO":
          changeProvinceName("CARTAGO",3,pt.location,36);
          break
        case "PARAISO":
          changeProvinceName("CARTAGO",3,pt.location,37);
          break
        case "LA UNION":
          changeProvinceName("CARTAGO",3,pt.location,38);
          break
        case "JIMENEZ":
          changeProvinceName("CARTAGO",3,pt.location,39);
          break
        case "TURRIALBA":
          changeProvinceName("CARTAGO",3,pt.location,40);
          break
        case "ALVARADO":
          changeProvinceName("CARTAGO",3,pt.location,41);
          break
        case "OREAMUNO":
          changeProvinceName("CARTAGO",3,pt.location,42);
          break
        case "EL GUARCO":
          changeProvinceName("CARTAGO",3,pt.location,43);
          break
        case "HEREDIA": 
          changeProvinceName("HEREDIA",4,pt.location,44);
          break
        case "HEREDIA_":
          changeProvinceName("HEREDIA",4,"HEREDIA",44);
          break
        case "BARVA":
          changeProvinceName("HEREDIA",4,pt.location,45);
          break
        case "SANTO DOMINGO":
          changeProvinceName("HEREDIA",4,pt.location,46);
          break
        case "SANTA BARBARA": 
          changeProvinceName("HEREDIA",4,pt.location,47);
          break
        case "SAN RAFAEL": 
          changeProvinceName("HEREDIA",4,pt.location,48);
          break
        case "SAN ISIDRO":
          changeProvinceName("HEREDIA",4,pt.location,49);
          break
        case "BELEN": 
          changeProvinceName("HEREDIA",4,pt.location,50);
          break
        case "FLORES": 
          changeProvinceName("HEREDIA",4,pt.location,51);
          break
        case "SAN PABLO": 
          changeProvinceName("HEREDIA",4,pt.location,52);
          break
        case "SARAPIQUI":
          changeProvinceName("HEREDIA",4,pt.location,53);
          break
        case "LIBERIA": 
          changeProvinceName("GUANACASTE",5,pt.location,54);
          break
        case "NICOYA":
          changeProvinceName("GUANACASTE",5,pt.location,55);
          break
        case "SANTA CRUZ":
          changeProvinceName("GUANACASTE",5,pt.location,56);
          break
        case "BAGACES":
          changeProvinceName("GUANACASTE",5,pt.location,57);
          break
        case "CARRILLO": 
          changeProvinceName("GUANACASTE",5,pt.location,58);
          break
        case "CAÑAS":
          changeProvinceName("GUANACASTE",5,pt.location,59);
          break
        case "ABANGARES":
          changeProvinceName("GUANACASTE",5,pt.location,60);
          break
        case "TILARAN":
          changeProvinceName("GUANACASTE",5,pt.location,61);
          break
        case "NANDAYURE":
          changeProvinceName("GUANACASTE",5,pt.location,62);
          break
        case "LA CRUZ":
          changeProvinceName("GUANACASTE",5,pt.location,63);
          break
        case "HOJANCHA":
          changeProvinceName("GUANACASTE",5,pt.location,64);
          break
        case "PUNTARENAS":
          changeProvinceName("PUNTARENAS",6,pt.location,65);
          break
        case "PUNTARENAs": 
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA DEL COCO":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA NUEZ":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA CABO BLANCO":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA CABUYA":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA TORTUGA": 
        changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA ALCATRAZ": 
        changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLAS NEGRITOS":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA NEGRITOS":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA JESUITA":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA CEDROS":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA MUERTOS":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA SAN LUCAS":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA VENADO":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA CABALLO": 
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA BEJUCO":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ISLA CHIRA":
          changeProvinceName("PUNTARENAS",6,"PUNTARENAS",65);
          break
        case "ESPARZA":
          changeProvinceName("PUNTARENAS",6,pt.location,66);
          break
        case "BUENOS AIRES":
          changeProvinceName("PUNTARENAS",6,pt.location,67);
          break
        case "MONTES DE ORO":
          changeProvinceName("PUNTARENAS",6,pt.location,68);
          break
        case "OSA":
          changeProvinceName("PUNTARENAS",6,pt.location,69);
          break
        case "AGUIRRE":
          changeProvinceName("PUNTARENAS",6,pt.location,70);
          break
        case "GOLFITO": 
          changeProvinceName("PUNTARENAS",6,pt.location,71);
          break
        case "COTO BRUS":
          changeProvinceName("PUNTARENAS",6,pt.location,72);
          break
        case "PARRITA":
          changeProvinceName("PUNTARENAS",6,pt.location,73);
          break
        case "CORREDORES":
          changeProvinceName("PUNTARENAS",6,pt.location,74);
          break
        case "GARABITO":
          changeProvinceName("PUNTARENAS",6,pt.location,75);
          break
        case "LIMON":
          changeProvinceName("LIMON",7,pt.location,76);
          break
        case "POCOCI":
          changeProvinceName("LIMON",7,pt.location,77);
          break
        case "SIQUIRRES":
          changeProvinceName("LIMON",7,pt.location,78);
          break
        case "TALAMANCA":
          changeProvinceName("LIMON",7,pt.location,79);
          break
        case "MATINA":
          changeProvinceName("LIMON",7,pt.location,80);
          break
        case "GUACIMO":
          changeProvinceName("LIMON",7,pt.location,81);
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




var xData = [
  //[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  //[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  //[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2009, 2010, 2011, 2012, 2013, 2014]
];

var yData = [
  //[74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
  [34, 35, 32, 31, 31, 28]
  //[13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
  //[18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]
];

var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)',
  'rgba(189,189,189,1)'
];

var lineSize = [2, 2, 4, 2];

var labels = ['Television', 'Newspaper', 'Internet', 'Radio'];

var data = [];

for ( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    x: xData[i],
    y: yData[i],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: colors[i],
      width: lineSize[i]
    }
  };
  var result2 = {
    x: [xData[i][0], xData[i][5]],
    y: [yData[i][0], yData[i][5]],
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: colors[i],
      size: 6
    }
  };
  data.push(result, result2);
}

var layout = {
  showlegend: false,
  height: 500,
  width: 500,
  xaxis: {
    showline: true,
    showgrid: false,
    showticklabels: true,
    linecolor: 'rgb(204,204,204)',
    linewidth: 2,
    autotick: false,
    ticks: 'outside',
    tickcolor: 'rgb(204,204,204)',
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: 'Arial',
      size: 6,
      color: 'rgb(82, 82, 82)'
    }
  },
  yaxis: {
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: false
  },
  autosize: false,
  margin: {
    autoexpand: false,
    l: 100,
    r: 20,
    t: 100
  },
  annotations: [
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.0,
      y: 1.05,
      xanchor: 'left',
      yanchor: 'bottom',
      text: 'Grafico de Lineas',
      font:{
        family: 'Arial',
        size: 30,
        color: 'rgb(37,37,37)'
      },
      showarrow: false
    },
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      text: 'Source: Pew Research Center & Storytelling with data',
      showarrow: false,
      font: {
        family: 'Arial',
        size: 6,
        color: 'rgb(150,150,150)'
      }
    }
  ]
};

for( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    xref: 'paper',
    x: 0.05,
    y: yData[i][0],
    xanchor: 'right',
    yanchor: 'middle',
    text: labels[i] + ' ' + yData[i][0] +'%',
    showarrow: false,
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    }
  };
  var result2 = {
    xref: 'paper',
    x: 0.95,
    y: yData[i][11],
    xanchor: 'left',
    yanchor: 'middle',
    text: yData[i][5] +'%',
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    },
    showarrow: false
  };

  layout.annotations.push(result, result2);
}

Plotly.newPlot('graphContainer1', data, layout);