const express =require("express")
const app =express()
require("./dbconn/connection");
const router =require("./Routes/userrouter")
const cors =require("cors")
app.use(cors())
app.use(express.json())
app.use(router)
app.use("/uploads",express.static("./uploads"))



app.listen(4000,()=>{
    console.log(`server runing on port no 4000`);
})