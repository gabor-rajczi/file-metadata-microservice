var express = require("express");
var multer = require("multer");

var app = express();

var upload = multer().single('uploaded_file');
var port = process.env.PORT || 8080;    
var size;

app.set("view engine", "pug");
app.set("views", __dirname +"/views");

app.get("/", function(req, res){
    res.render('index');
});

app.post("/", function(req, res){
    function catchError(err){
        res.status(500).send(err);
    }
    upload(req, res, function (err) {
        if (err){
            catchError(err);
        }
        else {
            size = req.file.size;
            res.redirect("/get_file_size");
        }
    })
});

app.get("/get_file_size", function(req, res){
    res.status(200).send({size: size});
})

app.listen(port, running);

function running(){
    console.log("App is running on port "+port+"!");
}