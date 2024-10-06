import React, { createContext, useState } from "react"; 
import all_product from "../Components/Assets/all_product";



export const ShopContext = createContext (null);// created ShopContext using createcontext
    const getDefaultCart = ()=>{

    let cart= {};

    for(let index=0; index < all_product.length+1; index++){
        cart[index] = 0; //intialize product id with 0
    }
    return cart;

 }

const ShopContextProvider = (props)=>{// ShopContextProvider where we pass the props
     const [cartItems, setCartItems] = useState(getDefaultCart());//pass the function getDefaultCart
     

   
     const addToCart = (itemId)=>{ //pass item id
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        //previtemId will give us the value for that key
        console.log(cartItems);// check this console log when click addToCart

     }
      
     const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        //previtemId will give us the value for that key

     }

     const getTotalCartAmount = () => {
        let totalAmount = 0;

        for(const item in cartItems){
            
            if(cartItems[item]>0)
                {
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
               }

            return totalAmount;
        }
     }

     const getTotalCartItems = ()=>{

        let totalItem = 0;

        for(const item in cartItems){


            if(cartItems[item]>0){
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
     }
     
     const  contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems,addToCart,removeFromCart}; 
     //contextValue variable that stores the data and functions that we want to access using context

     return <ShopContext.Provider value ={contextValue}>
    
        {props.children}
     </ShopContext.Provider>

}

export default ShopContextProvider;

//ShopConProv passes the value contextValue, within it pass the props children
//addToCart function to add products to our cart
