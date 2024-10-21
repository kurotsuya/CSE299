import React, {useState, useEffect} from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {

  const [allproducts, setAllProducts] =useState([]);//allproduct state var to hold product details

  const fetchInfo = async () =>{  //The fetchInfo function is defined to get product data from the server.

    await fetch('http://localhost:4000/allproducts') //It makes a request to 'http://localhost:4000/allproducts' to get the list of products.
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});//When the response is received, it converts the response to JSON format and then updates the allproducts state with this data.
  }
  
  useEffect(()=>{ //So, when the component (ListProduct) mounts (first shows up on the screen), the fetchInfo function is called to get the product data from the server. 
  //ListProduct is a React functional component. It contains the logic to fetch and display products.
    fetchInfo(); //Empty, this way, you load the data only once, avoiding unnecessary requests each time the component updates or re-renders.
  },[])


  const remove_product =  async()=>{ //func to remove product from a server, takes id as a paramater of the product to delete
    await fetch('http://localhost:4000/removeproduct',{  // Send a POST request to remove a product with the specified ID
      method: 'POST', //// Specify the server that this is a POST request
      headers:{
        Accept: 'application/json', // Indicate we expect a JSON response
        'Content-Type': 'application/json', // Specify that we're sending JSON data
      },
      body: JSON.stringify({id:id}) // Convert the product ID into a JSON string and send it
    })
    await fetchInfo(); // Refresh the product list after removing the product
  }


  return (
    <div className= 'list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
       <p>Products</p>
       <p>Title</p>
       <p>Old Price</p>
       <p>New Price</p>
       <p>Category</p>
       <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr/>
        {allproducts.map((product,index)=>{
          return <> <div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} clasName='listproduct-remove-icon' src={cross_icon} alt="" />


          </div>
          <hr/>
          </>

        })}

      </div>
      
    </div>
  )
}

export default ListProduct
// <img onClick> which means that when the image is clicked, it will call the remove_product function, passing in the id of the product.
