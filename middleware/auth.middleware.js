import { validtoken } from "../service/auth.js";

 function checkforauthentication(cookiename){
return async ( req,res,next)=>{
    const tokenvalue= req.cookies[cookiename]
    if(!(tokenvalue)) return next(); 
    // no token not logged in 

try{
    const payload=await validtoken(tokenvalue)
    req.user=payload
    console.log(tokenvalue +"in middlware which works everytime during refresh status 200")
}
catch(err){
    console.error("someeror")
}
next()
}
}

export{
checkforauthentication

}