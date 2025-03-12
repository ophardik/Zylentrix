const express=require("express")
const app=express();
const userRoute=require("./Routes/userRoutes")
require("dotenv").config({ path: "./config/.env" });
const connectToDb=require("./Config/db")

app.use(express.json());
connectToDb();

app.use("/api",userRoute)
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+process.env.PORT);
})