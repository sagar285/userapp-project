import { Apifetchrequest } from "./Apirequest";
import { Backend_url } from "./Backendurl";

export const registerapi=async(data,header)=>{
    return await Apifetchrequest("POST",`${Backend_url}/register`,data,header)
}

export const allusers =async()=>{
    return await Apifetchrequest("GET",`${Backend_url}/users`)
}

export const singleuserapi =async(id)=>{
    return await Apifetchrequest("GET",`${Backend_url}/user/${id}`)
}

export const updateuser=async(id,data,header)=>{
    return await Apifetchrequest("PUT",`${Backend_url}/update/${id}`,data,header)
}

export const deleteuser =async(id)=>{
    return await Apifetchrequest("DELETE",`${Backend_url}/delete/${id}`,{})
}