import mongoose from "mongoose";
import express from "express";import path from "path";
const app = express();
const PORT = process.env.PORT ;
import 'dotenv/config'
import {router} from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import { checkforauthentication } from "./middleware/auth.middleware.js";
import { blogrouter } from "./routes/blog.router.js";
import { blog } from "./models/blog.model.js";

// "mongodb://localhost:27017/blog"
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongodb conneceted")).catch((err)=>{
console.log("connection  in mongoose error ")
})
// mongodbconnect("mongodb://localhost:27017/shorturl");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkforauthentication("token"))
app.use(express.static(path.resolve("./public")))
app.use("/user",router)
app.use("/blog",blogrouter)
app.get('/', async(req, res) => {
  const allblogs= await blog.find({})
  res.render('homepage',{
    allblogs,
    user:req.user
  });
});

app.listen(PORT, () => {
  console.log("server has been created at port", PORT);
});
