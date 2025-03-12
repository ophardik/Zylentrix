const express=require("express");
const { createUser, allUsers, singleUser, updateUserInfo, deleteUser } = require("../Controllers/userController");
const router=express.Router();

router.post("/create",createUser)
router.get("/allUsers",allUsers)
router.get("/singleUser/:userId",singleUser)
router.patch("/updateUser/:userId",updateUserInfo)
router.delete("/deleteUser/:userId",deleteUser)

module.exports=router