const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express()
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Dark@2004",  
    database:"restaurent"   
});

connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app.post("/",encoder,function(req,res){
    console.log(req.body)
    let usr=req.body.username
    let pass= req.body.password

    connection.query("select * from loginuser where user_name=? and user_pass = ?",[usr,pass],function(error,results,fields){
        if(results.length > 0) {
            res.redirect("/restaurant");
        } else {
            res.redirect("/");
        }
        res.end();
    })
    // res.send("ok")
})

app.get("/restaurant",function(req,res){
    res.sendFile(__dirname + "/restaurant.html")
})

app.listen(4500);