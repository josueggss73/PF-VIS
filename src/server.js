var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var currentPieQuery = "lol";
var currentBarsQuery = "lol";
var currentDonutQuery = "lol"

app.use(bodyParser.text({ type: "application/json" }));

var server = app.listen(8080, function () {
    console.log('Server is running..');
});

// config for your database
var config = {
    user: 'josue',
    password: '#########',
    //server: 'MSSQLSERVER01', 
    server: 'localhost', 
    database: 'PC3-VIS' 
};
var sql = require("mssql");
// connect to your database
sql.connect(config, function (err) {

    if (err) console.log(err);

});

app.get('/main.css', function(req, res) {
    res.sendFile(__dirname + "/" + "main.css");
});
app.get('/main.js', function(req, res) {
    res.sendFile(__dirname + "/" + "main.js");
});
app.get('/provinces.json', function(req, res) {
    res.sendFile(__dirname + "/" + "provinces.json");
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
    var query = "Select A.Provincia, A.Sexo, A.Condicion, CONVERT(decimal(10,2),(CAST(SUM(A.Total) as FLOAT) / CAST((Select SUM(B.Total) "+
    "From Asegurados B Where B.Año = "+member.year+" AND B.Provincia = A.Provincia AND B.Sexo = A.Sexo " +
    "Group By B.Provincia, B.Sexo) AS FLOAT))*100) 'Porcentaje' "+
    "From Asegurados A "+
    "Where A.Año = "+member.year+" AND A.Provincia = '"+member.province+"' "+
    "Group By A.Provincia, A.Sexo, A.Condicion";
    console.log(query);
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
    var query = "select A.Provincia, A.Condicion, SUM(A.Total) 'Total' "+
    "from Asegurados A "+
    "where A.Año = "+member.year+" AND A.Sexo = '"+member.sex+"' "+
    "Group By A.Provincia, A.Condicion ";
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