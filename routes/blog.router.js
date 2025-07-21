import { Router } from "express";
import { user } from "../models/user.model.js";
import { title } from "process";
import multer from "multer";
import path from "path";
import {blog} from "../models/blog.model.js";
import { comment } from "../models/comments.model.js";
const blogrouter = Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(`./public/uploads/`))
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
            }
})
const upload=multer({storage:storage})
blogrouter.get("/addblog",(req,res)=>{
    res.render("addblog",
        // cause nav bar also exists in this page 
        {
            user:req.user
            // user data has been sent here 
        }
    );
})
// blogrouter.post("/addblog",(req,res)=>{
//     console.log(req.body)
//    return res.render("/",
//         // cause nav bar also exists in this page 
//         {
//             title:req.body.title,
//             blogbody:req.body.blogbody

//         }
//     )
//    })


blogrouter.get("/userblogs/:id",async (req,res)=>{
  
    // these re all the blogs by user esee cha edhr ek blog and user blogs dropdown menu shiould ahve all the blogs by user but taht route 
  try{
    const userblogs=await blog.find({author:req.params.id})
    return res.render("userblogs",{
        userblogs
        ,user:req.user
    })
}
catch(err){
    console.log(err.message+"in this blogrouter id ")
}
})

blogrouter.get("/:id",async (req,res)=>{
    try{
const blogi = await blog.findById(req.params.id).populate('author');
        console.log(req.user)
        console.log(blogi.author)
        const commentii= await comment.find({blogid:req.params.id}).populate("useri")
        console.log(commentii)
        return res.render("blog",{
            blog:blogi,user:req.user,
            comment:commentii
        })
    }
    catch(Err){
        console.log(Err.message+"in this blogrouter id of each blog  ")
    }
})

blogrouter.post("/addblog",upload.single('coverimage'),async (req,res)=>{
      
const {blogbody,title}= req.body
console.log(req.body)
console.log(req.file)
const newblog= await blog.create({
    title,
    blogbody,
    author:req.user._id,
    coverimage: `/uploads/${req.file.filename}`
})

// edhr redierct or render ? render se data bhej denge new blog ka 
// or agr ham redirect krden aur id se ham blog dhundle 

// return res.render(`/blog/${req.user._id}`,{
//     newblog
// })
// newblog.id
return res.redirect(`/blog/${newblog._id}`)
})

// home page ke andr data gya toh sirf newblog ka 

// blogrouter.get("/:id",async (req,res)=>{
//     return res.render("homepage")
// })


blogrouter.post("/comments/:blogid",async(req,res)=>{
    try{
    const commenti=  await comment.create({
            content:req.body.content,
            blogid:req.params.blogid,
            // author:req.user._id
            useri:req.user._id

        })
console.log(commenti)
        return res.redirect(`/blog/${req.params.blogid}`)

    }
    catch(Err){
        console.log(Err.message+"in this blogrouter id of each blog  ")
    }
})

// blogrouter.get("/")

export{
    blogrouter
}