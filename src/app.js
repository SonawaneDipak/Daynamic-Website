const express=require("express");
require("./db/conn");
const User=require("./models/dynamic")
const path=require("path")
const hbs=require("hbs");
const app=express();

const port=process.env.PORT||80;
// setting the path
// jar aaplyla html or css add karaych asel he used kru aani static 
// mhanje html and css files 
const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");

console.log(path.join(__dirname,"../templates/views"));

// console.log(path.join(__dirname,"../public"));

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/css',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));


app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);

// routing
app.get("/",(req,res)=>{

    res.render("index");
})

app.get("/contact",(req,res)=>{

    res.render("contact");
})

app.post("/contact",async(req,res)=>{
    try {
        // res.send(req.body);
        const userData=new User(req.body);
        await userData.save();
        res.status(201).render("contact");
    } catch (error) {
        res.status(500).send(error);
    }

     
})

// server create  
app.listen(port,()=>{

    console.log(`server is running at port number ${port}`)
})