import React,{useState,useEffect} from "react";
import "../styles/Register.css"
import { registerapi } from "../API/Apicall";
import {useNavigate} from "react-router-dom"
const Register = () => {
  const [input, setinput] = useState({
    name:"",
    email:"",
    password:""
  })
const [imgdata, setimgdata] = useState("")
const [imgpreview, setimgpreview] = useState("")
const [error, seterror] = useState(false)
const navigate =useNavigate();


const inputvalue =(e)=>{
  const {name,value} = e.target;
  setinput({...input,[name]:value})
}
const inputimg =(e)=>{
setimgdata(e.target.files[0])
}

useEffect(()=>{

  if(imgdata){
    setimgpreview(URL.createObjectURL(imgdata))
  }

},[imgdata])

const submitdata =async(e)=>{
e.preventDefault()
if(!input.name || !input.email ||!input.password || !imgdata){
         seterror(true)
         return false;
}

let formdata =new FormData()
formdata.append("name",input.name)
formdata.append("email",input.email)
formdata.append("password",input.password)
formdata.append("img",imgdata)

let config ={
  "Content-type":"multipart/form-data"
}

const response = await registerapi(formdata,config);
console.log(response.data.name);
if(response){
  navigate("/")
}
}


  return (
    <div className="main">
        <h1>Register form</h1>
      <form className="form">
        <img src={imgpreview?imgpreview:"/vite.svg"} alt="img" className="img"  />
        <div>
          <input type="text" name="name" placeholder="enter your name"onChange={inputvalue} />
          {error && !input.name && <p className="error">Enter name</p> }
        </div>
        <div>
          <input type="email" name="email" placeholder="eneter your email" onChange={inputvalue} />
          {error && !input.email && <p className="error">Enter email</p> }

        </div>
        <div>
          <input type="password" name="password" placeholder="enter your password" onChange={inputvalue} />
          {error && !input.password && <p className="error">Enter password</p> }

        </div>
        <div>
          <input type="file" name="img" onChange={inputimg}/>
          {error && !imgdata && <p className="error">choose your file</p> }

        </div>
        <div>
          <button className="btn" onClick={submitdata}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
