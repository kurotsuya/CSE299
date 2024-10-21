import React, {useState} from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

 const[image,setImage] =useState(false);

 const [productDetails, setProductDetails] = useState({
     name:"",
     image:"",
     category:"women",
     new_price:"",
     old_price:"",


 })

 const imageHandler =(e) =>{
   setImage(e.target.files[0]);

 }

 const changeHandler = (e)=>{
   setProductDetails({...productDetails,[e.target.name]:e.target.value}) //...productDetails to create an object with the same properties that productDetails is holding

 }

 const  Add_Product = async () =>{
  console.log(productDetails);
  let responseData;
  let product = productDetails;

  let formData= new FormData();
  formData.append('product',image);

  await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers: {
      Accept: 'application/json',

    },
    body: formData,
  }).then((resp) => resp.json()).then((data)=>{responseData=data}) // this line takes the response object resp returned from the server and converts it to JSON format.
   // this JSON data is stored into responseData                                                              
  
  if(responseData.success){// Check if the image was successfully uploaded
    // If true, we'll get the URL of the stored image

   product.image= responseData.image_url;// Store the image URL in the product object
   console.log(product);

  

   await fetch('http://localhost:4000/addporduct',{// Send a POST request to add the product
    method: 'POST', // Specify this is a POST request
    headers: {
      Accept: 'application/jason', // Indicate the server we expect a JSON response
      'Content-Type': 'application/jason' // Specify that we're sending JSON data
    },
    body: JSON.stringify(product), // Convert the product object to a JSON string

    }).then((resp)=>resp.json()).then((data)=>{ // Convert the response to JSON
      data.success?alert("Product Added"): alert("Failed")
    }) // Alert based on the response
    

  }

 }



  return (
    <div className= 'add-product'>
       <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value ={productDetails.name} onChange={changeHandler} type= "text" name = 'name' placeholder ='Type here' />

       </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type= "text" name = "old_price" placeholder ='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price}  onChange={changeHandler} type= "text" name = "new_price" placeholder ='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value ={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />

        </label>
        <input onChange ={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick ={()=>{Add_Product()}} className = 'addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
