import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h2>Animals to explore</h2>
        <div className='food-display-list'>
            {food_list.map((item,index)=>{
                if(category==='All' || category===item.type){  //if(category==='All' || category===item.category)
                   
                return <FoodItem key={index} id={item._id} name={item.name} description={item.info} price={item.type} img={item.img}/>
                }
                console.log(category)
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
