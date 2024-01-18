import jwt from 'jsonwebtoken';

const verifyToken=(req,res,next)=>{
    try{
    const token = req.header('Authorization');
   
    if (!token) return res.status(401).json({ error: 'Access denied' });
   
        const decoded = jwt.verify(token, 'SECRET');
        console.log(decoded,"dccc")
        console.log(req,"req")
        req._id = decoded._id;
        next();
    }catch(err){
        res.status(401).json({ error: 'Invalid token', err:err });
    }

}

export default verifyToken;