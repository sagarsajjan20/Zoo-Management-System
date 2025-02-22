import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) =>{

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name: '',
        description:'',
        price: '',
        category: ''
    })

    const onchangeHandler = (evevt) => {
        const name=evevt.target.name;
        const value=evevt.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('info', data.description);
        formData.append('cageNo', Number(data.price));
        formData.append('type', data.category);
        formData.append('img', image);
        console.log(data)
        const response= await axios.post(`${url}/api/animal/add`,formData);
        if(response.data.status=="success"){
            setData({
                name: '',
                description:'',
                price: '',
                category: ''
            })
            setImage(false)//refresh if data is uploded to database
            toast.success(response.data.message)
            //alert("Animal data sucessfully added into DB")
        }
        else{
            toast.error(response.data.message)
        }
    }

    // useEffect(()=>{
    //     console.log(data);
    // },[data])


  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Animal Name</p>
                <input onChange={onchangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Animal description</p>
                <textarea onChange={onchangeHandler} value={data.description} name='description'  rows='6' placeholder='Write Content here' required></textarea>

            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Animal category</p>
                    <select onChange={onchangeHandler} name='category' >
                        <option value="Birds">Birds</option>
                        <option value="Reptiles">Reptiles</option>
                        <option value="Mammals">Mammals</option>  
                        <option value="Big Cats">Big Cats</option>  
                        <option value="Primates">Primates</option>  
                        <option value="Amphibians">Amphibians</option>  
                        {/* <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Paste</option>
                        <option value="Noodles">Noodles</option> */}
                    </select>
                </div>
                <div className='add-price flex-col'>
                    <p>Cage No</p>
                    <input onChange={onchangeHandler} value={data.price} type='number' name='price'></input>
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
      
    </div>
  )
}

export default Add
