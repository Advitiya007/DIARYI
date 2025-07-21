import jwt from "jsonwebtoken"

const secret="adi@123"

 function createtoken(user){
    const {name,email,_id}= user;
    const payload={name,email,_id}

    const token = jwt.sign(payload,secret)

    return token;
}


 async function validtoken(token){
try{
    const payload= await jwt.verify(token,secret)
    // pay load is user details 
     return payload;
}
catch(err){
   console.error("valiaddate token error ",+err.message);
    return null;
}
   
}

export{
    createtoken,validtoken
}