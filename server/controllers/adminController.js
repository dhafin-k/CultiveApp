import jwt from 'jsonwebtoken'

export const adminLogin = async (req, res)=>{
    try{
        const {email, password} = req.body;
        
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({succes: false, massage: "Invalid Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({succes: true, token})
    }catch (error){
        res.json({succes: false, massage: error.massage})
    }
}