import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {  
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Animals</h1>
            <p className='explore-menu-text'>Discover a diverse range of animals from all corners of the globe. Our zoo features a variety of species, each with their own unique habitats and characteristics. From majestic mammals to colorful birds and fascinating reptiles, there's something for everyone to enjoy and learn about. Join us in celebrating wildlife and conservation.</p>

            <div className='explore-menu-list'>
                {menu_list.map((item,index)=>{
                    return(
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name) } key={index} className='explore-menu-list-item'>
                            
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })} 
            </div>
            <hr/>
        </div>
    )
}

export default ExploreMenu
