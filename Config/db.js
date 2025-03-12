const mongoose=require("mongoose");
require("dotenv").config();
async function connectToDb(){
   try {
    const conn=await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to database");
   } catch (error) {
    console.log("error while connecting to db");
    process.exit(1);
   }
}
module.exports=connectToDb