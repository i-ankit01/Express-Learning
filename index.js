const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname , "public")))
app.set("view engine", "ejs")

app.use(function(req , res , next){
    next()
})

app.get("/" , function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render("index" , {files : files})
    })
    
})

app.get("/files/:filename" , function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8" ,function(err, data){
        res.render("show" , {filename: req.params.filename , data : data})
    })
})

app.post("/create", function(req , res){
    fs.writeFile(`./files/${req.body.heading.split(" ").join("")}.txt`,req.body.content , function(err){
        res.redirect("/")
    })
})
app.listen(3000)