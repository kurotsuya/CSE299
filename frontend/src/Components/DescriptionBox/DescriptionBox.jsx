import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className = 'descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
        <p> An e-commerce website is an online platform 
            that enables businesses or individuals to buy and
            sell products or services over the internet. 
            These websites typically allow customers to
            browse product listings, make purchases, and arrange
            for delivery globally.</p>
            <p>
            Displays the products or services available for sale, 
            including descriptions, prices, and images.
            </p>
        </div>
       
      
    </div>
  )
}

export default DescriptionBox
