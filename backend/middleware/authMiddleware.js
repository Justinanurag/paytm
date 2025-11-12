const jwt=require('jsonwebtoken')
const JWT_SECRET = "mySecretKey123";

const authMiddleware=(req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer","");
    if(!token) return res.staus(401).json({
        error:"Access denied ,no token!"
    });
    try {
        const verified=jwt.verify(token,JWT_SECRET);
        req.user=verified;
        next();
    } catch (error) {
        req.staus(400).json({
            error:"Invalid token!",
            success:false
        })
    }
}

module.exports = authMiddleware;