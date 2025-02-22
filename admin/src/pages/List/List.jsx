import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({url}) => {
  
  const [list,setList]=useState([])

  const fetchList=async ()=>{
    try{
      const response=await axios.get(`${url}/api/animal/list`);
      
      if(response.data.status=="success"){
        setList(response.data.data)
      }
      else{
           toast.error("Error")
      }
    }
    catch{
      toast.error("Error(rejected promise)")
    }
  }

  const removeAnimals= async(animalId)=>{
    
     const response = await axios.post(`${url}/api/animal/remove`,{id:animalId})
     await fetchList()
     if(response.data.status=="success"){

      toast.success(response.data.data)
     }
     else{
  
      toast.error("ERROR")
     }
  }

  useEffect(()=>{
     fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Animals List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Type</b>
          <b>CageNo</b>
          <b>Action</b>

        </div>
        {list.map((item,index)=>{
           
           return (
            <div key={index} className='list-table-format'>
              
              <img src={`${url}/images/${item.img}`}></img>
              <p>{item.name}</p>
              <p>{item.type}</p>
              <p>{item.cageNo}</p>
              <p onClick={()=>removeAnimals(item._id)} className='cursor'>X</p>
              </div>
           )
        })}
      </div>
    </div>
  )
}

export default List
