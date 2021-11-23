const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
const app = express();

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "mysql_server",
    user: 'thoe',
    password: 'password',
    database: 'nodejs'
  });

var count = 0

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");

    db.query("CREATE TABLE IF NOT EXISTS counter (counts INT(100) NOT NULL)", function (err, result){
        if (err) throw err;
    });
 });

function get_hit_count() {
    db.connect(function(err) {
        if (err) throw err;
    
        db.query("UPDATE counter SET counts = counts + 1 ", function (err, result){
            if (err) throw err;
        });

        db.query("SELECT counts FROM counter ", function (err, result){
            if (err) throw err;
            console.log(result)
        });

     });
}

app.get('/', (req, res) => {
  res.send('Hello, welcome to my sample node.js app. I have been seen ' + get_hit_count()+ ' times');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

