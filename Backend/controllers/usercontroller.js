const User = require("../model/usershema");


// registertion api 
exports.userregister = async (req, res) => {
  const file = req.file.filename;
  const { name, email, password } = req.body;
  if (!name || !email || !password || !file) {
    res.status(400).send("pls filled all your fields");
  }
 
  try {
    const userexist = await User.findOne({ email: email });
    if (userexist) {
      res.status(400).send("this email id already registered");
    }
    const newuser = new User({ name, email, password, img: file });
    const usersave = await newuser.save();
    res.send(usersave);
  } catch (error) {
    console.log(error);
  }
};

exports.userget =async(req,res)=>{
  try {
        const users = await User.find({})
        res.status(200).send(users);
    
  } catch (error) {
    console.log(error);
    res.status(404).json({message:"this error from backend"})
  }
}

exports.singleuserget =async(req,res)=>{
  const {id}=req.params;
  try {
    const singleuser = await User.findOne({_id:id})
    res.status(200).send(singleuser);
    
  } catch (error) {
    res.status(404).send("this error from backend");
  }
}

exports.userupdate =async(req,res)=>{
  const {id} =req.params;
  const { name, email, password,img } = req.body;
  const file = req.file ? req.file.filename:img;
  try {
    const updatedata = await User.findByIdAndUpdate({_id:id},{name,email,password,img:file},{new:true})
    res.status(200).send(updatedata);
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.deleteuser =async(req,res)=>{
  const {id} =req.params
  try {
    const deletedata =await User.findByIdAndDelete({_id:id})
    res.status(200).send(deletedata);
  } catch (error) {
    res.status(400).send(error);
  }
}
