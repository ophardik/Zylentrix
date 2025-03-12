const userModel=require("../Models/userModel")
const createUser=async(req,res)=>{
    try {
        const {name,email,age}=req.body;
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
            const user=await userModel.create({
                name,
                email,
                age,
           
        })
        return res.status(201).json({
            message:"User created successfully",
            user
        })

    } catch (error) {
        console.log("error in creating user",error.message)
        return res.status(500).json({
            message: "Error in creating user"
        })
    }
}
const allUsers=async(req,res)=>{
    try {
        const users=await userModel.find({})
        return res.status(200).json({
            message:"Users fetched successfully",
            users
        })
    } catch (error) {
        console.log("error in fetching users",error.message);
        return res.status(500).json({
            message: "Error in fetching users"
        })
    }
}
const singleUser=async(req,res)=>{
   try {
    const {userId}=req.params;
    const user=await userModel.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({
            message:"User fetched successfully",
            user
            })
   } catch (error) {
    console.log("error in fetching user",error.message);
    return res.status(500).json({
        message: "Error in fetching user"
        })
   }
}
const updateUserInfo=async(req,res)=>{
    try {
        const {userId}=req.params;
        const {name,email,age}=req.body;
        const user=await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
            }
            if(email && email!==user.email){
                const emailExist=await userModel.findOne({email})
                if(emailExist){
                    return res.status(400).json({message:"Email already exist"})
                    }
            }
            const updatedUser=await userModel.findByIdAndUpdate(
                userId,
                {name,email,age},
                {new:true,runValidators:true}
            )
            return res.status(200).json({
                message:"User updated successfully",
                updatedUser
            })
    } catch (error) {
        console.log("error in updating user Info",error.message)
        return res.status(500).json({
            message: "Error in updating user Info"
            })
    }
}
const deleteUser=async(req,res)=>{
    try {
        const{userId}=req.params;
        const user=await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
            }
            const deleteUser=await userModel.findByIdAndDelete(userId);
            return res.status(200).json({
                message:"User deleted successfully",
                deleteUser
                })
    } catch (error) {
        console.log("error in deleting user",error.message);
        return res.status(500).json({
            message:"error in deleting user"
        })
    }
}
module.exports={createUser,allUsers,singleUser,updateUserInfo,deleteUser}