import React, {useContext} from 'react'
import './CSS/ShopCategory.css'
import  {ShopContext} from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'


const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className = 'shop-category'>
    <img className ='shopcategory-banner' src ={props.banner} alt =""/> 
    <div className = 'shopcategory-indexSort'>
      <p>
        <span>Showing 1-12</span> out of 36 products
      </p>
      <div className = 'shopcategory-sort'>
        Sort by <img src ={dropdown_icon} alt =""/>
      </div>

    </div>
      <div className ='shopcategory-products'>
         {all_product.map((item, i)=>{ //parameters item, i being passed
            if (props.category===item.category){ // if true then returns the item component
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> 
                //pass the props as we've done in NewCollections so go to NewCollectionsJsx to get the props 
            }
            else{
              return null;
            }
         })}
      </div>
  
       <div className="shopcategory-loadmore">
        Explore More 
       </div>


    </div>
  )
}

export default ShopCategory

// inserting the all_product data using context
// adding <img src shows all the banners in each of the designated pages
// within the div 'shop-category' create another div 'shopcategory-indexSort'
// now within the div  'shopcategory-indexSort', create another div
// within the div 'shop-category create another div to map the different catergory products
// to add the css for the shop-category page, add className shopcategory-banner to <img src= {props.banner}...
// then added the explore more option