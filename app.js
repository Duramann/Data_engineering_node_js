const PORT = 5000;
const HOST = '0.0.0.0';

const express = require('express');

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "host.docker.internal",
    user: 'root',
    password: 'password',
    database: 'nodejs'
  });

var count = 0

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");

    db.query("CREATE TABLE IF NOT EXISTS counter (count INT(100) NOT NULL)", function (err, result){
        if (err) throw err;
    });

    db.query("INSERT INTO counter VALUES (0);", function (err, result){
        if (err) throw err;
    });
 });

function get_hit_count() {
    db.connect(function(err) {
        if (err) throw err;
    
        db.query("UPDATE counter SET count = count + 1 ", function (err, result){
            if (err) throw err;
        });

        console.log("OK!")

        db.query("SELECT * FROM counter ", function (err, result){
            if (err) throw err;
            console.log(result)
        });

     });
}

const app = express();

app.get('/', (req, res) => {
    count = get_hit_count()
  res.send('Hello, welcome to my sample node.js app. I have been seen ' + count + ' times');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

