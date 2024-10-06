import React, {useContext} from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const{all_product} = useContext(ShopContext)   
  //to grab all_products data
   const{productId}= useParams ();
   // to add productID (from App.js) in product page
   //params to create the {productID} 
   const product= all_product.find((e)=> e.id === Number(productId)) 

   //using productID find the product in all_products data and assign it to one variable
   //then the ID stored in product will be displayed
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product= {product}/> 
      <DescriptionBox/>
      <RelatedProducts/>
      
    </div>
  )
}

export default Product


//now to provide links to products
//mount Breadcrum into Product.jsx
//mount ProductDisplay into Product.jsx where product data is passed using product
//mount DescriptionBox
