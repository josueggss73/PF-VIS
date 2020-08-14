var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var currentPieQuery = "lol";
var currentBarsQuery = "lol";
var currentDonutQuery = "lol";
var currentLinesQuery = "lol";

app.use(bodyParser.text({ type: "application/json" }));

var server = app.listen(8080, function () {
    console.log('Server is running..');
});


// config for your database
//var config = {
//    user: 'josue',
//    password: 'warriorTX73',
//    server: 'MSSQLSERVER01', 
//    server: 'localhost', 
//    database: 'PF-VIS' 
//};
//var sql = require("mssql");
////// connect to your database
//sql.connect(config, function (err) {
//    if (err) console.log(err);
//});

app.get('/main.css', function(req, res) {
    res.sendFile(__dirname + "/" + "main.css");
});
app.get('/main.js', function(req, res) {
    res.sendFile(__dirname + "/" + "main.js");
});
app.get('/cantones.json', function (req, res) {
    res.sendFile(__dirname + "/" + "cantones.json");
});
app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname + "/" + "favicon.ico");
});
app.get('/', function (req, res) {
    res.sendFile('./index.html',{root:__dirname})
});
app.get('/bars', function (req, res) {
    res.send(currentBarsQuery);
 });
app.post('/bars', function(req, res){
    var member = JSON.parse( req.body );
    var request = new sql.Request();
    var query = "select TOP(10) T.nombreTumor, TC.cantidad from "+
    "Tumores T inner join Tumores_X_Cantones TC on T.idTumor = TC.idTumor "+
    "where TC.idCanton = "+member.canton+" AND TC.idSexo = "+member.sex+" AND TC.year = "+member.year+" "+
    "order by cantidad ASC";
    //console.log(query);
    request.query(query, function (err, recordset) {
        if (err) console.log(err)
        currentBarsQuery = recordset.recordset;
    });
});
app.get('/pie', function (req, res) {
    res.send(currentPieQuery);
 });
app.post('/pie', function(req, res){
    var member = JSON.parse( req.body );
    var request = new sql.Request();
    var query = "select G.grupoEdad, idSexo, TG.cantidad from "+
    "GruposEdad G inner join Tumores_X_GruposEdad TG on G.idGrupoEdad = TG.idGrupoEdad "+
    "where TG.year = "+member.year+" AND TG.idTumor = "+member.tumor+" ";
    request.query(query, function (err, recordset) {
        if (err) console.log(err)
        currentPieQuery = recordset.recordset;
    });
});
app.get('/donut', function (req, res) {
    res.send(currentDonutQuery);
 });
app.post('/donut', function(req, res){
    var member = JSON.parse( req.body );
    var request = new sql.Request();
    var query = " select A.Condicion,SUM(A.Total) 'Total' "+
    "from Asegurados A "+
    "where A.Año = "+member.year+" "+
    "group by A.Condicion ";
    request.query(query, function (err, recordset) {
        if (err) console.log(err)
        currentDonutQuery = recordset.recordset;
    });
});
app.get('/lines', function (req, res) {
    res.send(currentLinesQuery);
 });
app.post('/lines', function(req, res){
    var member = JSON.parse( req.body );
    var request = new sql.Request();
    var query = " select T.nombreTumor, TG.year, TG.idSexo, SUM(TG.cantidad) 'Total' "+
    "from Tumores T inner join Tumores_X_GruposEdad TG on T.idTumor = TG.idTumor "+
    "where T.idTumor = "+member.tumor+" "+
    "group by T.nombreTumor, TG.year, TG.idSexo "+
    "order by TG.year";
    request.query(query, function (err, recordset) {
        if (err) console.log(err)
        currentLinesQuery = recordset.recordset;
        //console.log(currentLinesQuery);
    });
});