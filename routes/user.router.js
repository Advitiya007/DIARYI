import { Router } from "express";
import { user } from "../models/user.model.js";
const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/signin", (req, res) => {
  res.render("signin");
});
router.post("/signup", async (req, res) => {
  const { name,  email, password } = req.body;

  await user.create({
    name,
    
    email,
    password,
  });

  return res.redirect("/");
});

router.post("/signin",async(req,res)=>{
    const { email, password } = req.body;
    console.log(email,password+"signin route post")
    // vortual fxn 
    try{
      // user os the body main model
    const token= await user.matchpasswordandsendtoken(email,password)
    console.log(token+"this is the user token in signin page  ")
if(token==null) throw new Error("wrong pass");

return res.cookie("token",token).redirect("/")
    }

    catch(Err){
        console.log(Err)
         return res.render("signin",{
          error:Err.message
         })
        
    }
})


router.get("/logout",(req,res)=>{
  res.clearCookie("token").redirect("/")
})
export{
    router
}