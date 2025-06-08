//Required express
const { render } = require("ejs");
const express = require("express");
const app = express();
const port = 8080;

//require method override for patch and delete actions

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//require path
const path = require("path");

//Views 
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "/views"));

//public
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public")));

//get & post
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//listening server
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});

// requiring uuid package for unique id's
const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed

//basic array implemaentation for posts

let posts = [
    {   id:uuidv4(),
        username:"Shubham",
        content:"I love cricket"
    },
    {
        id:uuidv4(),
        username:"Pranav",
        content:"I love NDA"
    },
    {
        id:uuidv4(),
        username:"Rushi",
        content:"I love Building IOT based Projects"
    }
];

//basic get for testing i.e index.ejs
app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

//rendering on add new posts page i.e new.ejs
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {
    let {username, content} = req.body;
    const id = uuidv4();
    posts.unshift({id ,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("view.ejs", {post});
    if(!(post)){
        res.render("error.ejs");
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newContent; 
        res.redirect("/posts"); 
    } else {
        res.status(404).send("Post not found");
    }
});


app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});


app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});