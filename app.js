const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(express.static('public'));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name:String
});
const item = mongoose.model("task",trySchema);

const todo = new item({
    name:"Create videos"
});

const todo1 = new item({
    name:"Learn DSA"
});
const todo2 = new item({
    name:"Learn React"
});
const todo3 = new item({
    name:"Get some rest"
});

//todo1.save();todo3.save();todo2.save();
app.get("/",function(req,res){
    item.find()
        .then((foundItems) => {
            res.render("list", {ejes: foundItems});
        })
        .catch((err)=>{
            console.log();
            res.status(500),send("An error occured while retrieving items");
        });
});
app.post('/',function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new item({
        name: itemName
    });
    todo4.save();
    res.redirect('/');
});
app.post('/delete',function(req,res){
    const taskId = req.body.task1;
    console.log(taskId);
    item.findByIdAndDelete(taskId)
    .then(()=>{
                console.log("deleted");
                res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});


// app.post('/delete',function(req,res){
//     const checked = req.body.checkbox1;
//     item.findByIdAndDelete(checked,function(req,res){
//         if(!err){
//             console.log("deleted");
//             res.redirect("/");
//         }
//     });
// });

app.listen("3000", function(){
    console.log("server is running...");
});




