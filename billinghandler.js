const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
  const app = express();
  const cookieParser = require('cookie-parser');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hoteldb",
    port: 3306,
    multipleStatements: true
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
app.get('/additem',function(req,res)
{
    var selectfromtemptable = "SELECT * from tempbilltable where itemname=? and name=?";
    var insertintotempbilltable="INSERT INTO tempbilltable1 set ?";
    var updateintotempbilltable="UPDATE tempbilltable1 set ? where id= ? ";
    var deletefromtempbilltable="DELETE "
})

module.exports= app;