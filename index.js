//Required express
const express = require("express");
const app = express();
const port = 8080;

//require path
const path = require("path");

//Views 
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "/views"));

//public
app.set(express.static(path.join(__dirname,"/public/css")));
app.set(express.static(path.join(__dirname,"/public/js")));

//get & post
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//listening server
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});

//basic get for testing 
app.get("/", (req,res) => {
    res.send("Server working Well");
});