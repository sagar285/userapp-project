import React, { useState, useEffect } from "react";
import "../styles/Users.css";
import { allusers,deleteuser } from "../API/Apicall";
import { Backend_url } from "../API/Backendurl";
import {Link} from "react-router-dom"

const Users = () => {
  const [data, setdata] = useState([]);




  const getusers = async () => {
    const response = await allusers();
    console.log(response);
    setdata(response.data);
  };

  const deletedata=async(id)=>{
    const response = await deleteuser(id);
   if(response){
    getusers();
   }else{
    alert("user not deleted")
   }
  }

  useEffect(() => {
    getusers();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Email id</th>
            <th> IMAGE</th>
            <th>User-Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>
                <img src={`${Backend_url}/uploads/${val.img}`} alt="img" />
              </td>
              <td>
                <button><Link to={`/user/${val._id}`}> View profile</Link></button>
                <button><Link to={`/update/${val._id}`}> Update profile</Link> </button>
                <button onClick={()=>deletedata(val._id)}> Delete profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
