import React,{useState,useEffect} from "react";
import "../styles/Register.css"
import { updateuser, singleuserapi } from "../API/Apicall";
import { useParams,useNavigate } from "react-router-dom";
import { Backend_url } from "../API/Backendurl";


const Updateuser = () => {
  const [input, setinput] = useState({
    name:"",
    email:"",
    password:""
  })
const [imgdata, setimgdata] = useState("")
const [imgvalues, setimgvalues] = useState("")
const [imgpreview, setimgpreview] = useState("")
const [error, seterror] = useState(false)
const {id}=useParams();
const navigate =useNavigate()


const inputvalue =(e)=>{
  const {name,value} = e.target;
  setinput({...input,[name]:value})
}
const inputimg =(e)=>{
setimgdata(e.target.files[0])
}
const userprofile =async()=>{
    const response = await singleuserapi(id);
    console.log(response)
    setinput(response.data)
    setimgvalues(response.data.img);
}



useEffect(()=>{
   userprofile()
},[id])

useEffect(()=>{

  if(imgdata){
    setimgvalues("");
    setimgpreview(URL.createObjectURL(imgdata))
  }

},[imgdata])

const submitdata =async(e)=>{
e.preventDefault()
if(!input.name || !input.email ||!input.password){
         seterror(true)
         return false;
}

let formdata =new FormData()
formdata.append("name",input.name)
formdata.append("email",input.email)
formdata.append("password",input.password)
formdata.append("img",imgdata || imgvalues)

let config ={
  "Content-type":"multipart/form-data"
}

const response = await updateuser(id,formdata,config);
console.log(response);
navigate("/")
}


  return (
    <div className="main">
        <h1>Update user detail</h1>
      <form className="form">
        <img src={imgpreview?imgpreview:`${Backend_url}/uploads/${imgvalues}`} alt="img" className="img"  />
        <div>
          <input type="text" name="name" value={input.name} placeholder="enter your name"onChange={inputvalue} />
          {error && !input.name && <p className="error">Enter name</p> }
        </div>
        <div>
          <input type="email" name="email" value={input.email} placeholder="eneter your email" onChange={inputvalue} />
          {error && !input.email && <p className="error">Enter email</p> }

        </div>
        <div>
          <input type="password" name="password" value={input.password} placeholder="enter your password" onChange={inputvalue} />
          {error && !input.password && <p className="error">Enter password</p> }

        </div>
        <div>
          <input type="file" name="img" onChange={inputimg}/>
          {error && !imgdata && <p className="error">choose your file</p> }

        </div>
        <div>
          <button className="btn" onClick={submitdata}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default Updateuser;
