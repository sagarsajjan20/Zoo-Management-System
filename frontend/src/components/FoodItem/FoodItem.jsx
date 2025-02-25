import React, { useState, useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, img }) => {

    //const [itemCount, setItemCount] = useState(0)
    const { cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);


    //1:40
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img  alt='' className="food-item-image" src={url+"/images/"+img} />
                {
                    console.log(url+"/image/"+"1720356018527-WIN_20240614_17_36_04_Pro.jpg")
                }
                {/* {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                    : <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" className="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" className="" />
                    </div>
                } */}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">{price}</p>
            </div>

        </div>
    )
}

export default FoodItem
