import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import { singleuserapi } from '../API/Apicall'
import { Backend_url } from '../API/Backendurl'
import "../styles/Singleuser.css"

const Singleuser = () => {
    const [profile, setprofile] = useState({})
    const {id}=useParams()

    const userprofile =async()=>{
        const response =await singleuserapi(id);
        setprofile(response.data);
    }


    useEffect(()=>{
      userprofile()
    },[id])

  return (
    <div className='maindiv'>
        <div className='profilediv'>
        <img src={`${Backend_url}/uploads/${profile.img}`} alt="" />
        <h1>Name:{profile.name}</h1>
        <h1 className='emailid'> Email:{profile.email}</h1>
        </div>
    </div>
  )
}

export default Singleuser