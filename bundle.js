(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var data = [{
    type: "choroplethmapbox", 
    name: "Provincias de Costa Rica", 
    geojson: "http://localhost:8080/provinces.json",
    locations: ["SJ","AL","CA","HE","GU","PU","LI"],
    z: [141,132,87,240,55,100,150],
    zmin: 25, zmax: 280, 
    colorbar: {y: 0, yanchor: "bottom", 
               title: {text: "Provincias de Costa Rica", side: "right"}},
    }];
    var layout = {mapbox: {style: "dark", center: {lon: -84.09, lat: 9.93}, zoom: 6}, width: 600, height: 550, 
    margin: {l: 0,t: 0, b: 0}};
    //margin = dict(l = 0, r = 0, t = 0, b = 0)
    var config = {mapboxAccessToken: "pk.eyJ1Ijoiam9zdWVnZ3NzNzMiLCJhIjoiY2tkMTA5MHNmMGRiMjJ0bW11NGdqNjljMCJ9.aQToRizI-RvaLRg7SopqrQ"};
    Plotly.newPlot('main', data, layout, config).then(gd=>{
        gd.on('plotly_click', d => {
            var pt = (d.points || [])[0]
            switch(pt.location) {
              case 'SJ':
                changeProvinceName("San José");
                break
              case 'AL':
                changeProvinceName("Alajuela");
                break
              case 'CA':
                changeProvinceName("Cartago");
                break
              case 'HE':
                changeProvinceName("Heredia");
                break
              case 'GU':
                changeProvinceName("Guanacaste");
                break
              case 'PU':
                changeProvinceName("Puntarenas");
                break
              case 'LI':
                changeProvinceName("Limón");
                break
            }
          })
    });

function changeProvinceName(province){
    document.getElementById("provinceName").innerHTML = province
}
function changeYear(year){
    document.getElementById("yearNumber").innerHTML = year
}
function funcionPrueba(){
  var response = httpPost("http://localhost:8080/endpoint");
  alert(response);
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function httpPost(theUrl)
{
    var formData = new FormData();
    formData.append("name","josue");

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, true ); // false for synchronous request
    //xmlHttp.send(formData);
    xmlHttp.send({json:{name:'josue'}});
    //xmlHttp.send("PICHA");
    return xmlHttp.responseText;
    /*const https = require('https')

    const data = JSON.stringify({
      name: 'JosueGS'
    })

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/endpoint',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', (error) => {
      console.error(error)
    })

    req.write(data)
    req.end()*/
}







//----Pie------
var dataPie = [{
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    type: 'pie'
}];
var layoutPie = {
    height: 240,
    width: 340,
    margin: {l: 15,t: 15, b: 15,r: 15}
};
  
Plotly.newPlot('graph1', dataPie, layoutPie);
//----Bubbles-----
var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    mode: 'markers',
    marker: {
      size: [40, 60, 80, 100]
    }
};
  
var dataBubbles = [trace1];
  
var layoutBubbles = {
    title: 'Marker Size',
    showlegend: false,
    height: 240,
    width: 340,
    margin: {l: 15,t: 15, b: 15,r: 15}
};
  
Plotly.newPlot('graph2', dataBubbles, layoutBubbles);
//----Bar-----
var dataBars = [
    {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      type: 'bar'
    }
];
var layoutBars = {
    height: 240,
    width: 340,
    margin: {l: 15,t: 15, b: 15,r: 15}
};  
Plotly.newPlot('graph3', dataBars,layoutBars);

module.exports = function (n) {return n * 111}
},{}]},{},[1]);
