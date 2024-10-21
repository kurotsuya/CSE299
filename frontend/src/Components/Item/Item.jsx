import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = (props) => {
  return (
    <div className ='item'>
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0, 0)} src={props.image} alt="" /></Link> 
        <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            TK {props.new_price}

        </div>
        <div className="item-price-old">
        TK {props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item

//link the item image with the product
//<Link>to={`/product/${props.id}`} read the image tag using link, productid in the link to navigate to the product id, routes to the page when clicked on it

