const express = require("express")
const router =express.Router()
const controller =require("../controllers/usercontroller")
const upload = require("../multer/imgconfig")


router.post("/register",upload.single("img"),controller.userregister)
router.get("/users",controller.userget)
router.get("/user/:id",controller.singleuserget)
router.put("/update/:id",upload.single("img"),controller.userupdate)
router.delete("/delete/:id",controller.deleteuser)



module.exports =router;


