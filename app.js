const express=require("express");
const path=require("path");
const cookieParser = require("cookie-parser");
const logger=require('morgan');
const expressSession=require("express-session");
const passport = require("passport");

const app=express();
const indexRouter=require("./routes/index");
const usersRouter=require("./routes/user");



app.set('views',path.join(__dirname,'views'));
app.set("view engine",'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"hey hey"
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());



app.use("/",indexRouter);
app.use("/users",usersRouter);


app.listen(3000,function(){
    console.log("Port Running on 3000");
})