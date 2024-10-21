const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require ("multer");
const path = require("path");
const cors = require("cors");


app.use(express.json());//this line helps the Express app understand JSON data that comes in requests.
app.use(cors()); //This line allows your Express app to accept requests from other websites or domains.

//Database Connection With MongoDb
mongoose.connect("mongodb+srv://greateststackdev:007007007@cluster0.32ffa.mongodb.net/e-commerce")//Connect our application to mongoose databse
//string inside is the connection URL, tells mongoose where to find our database
.then(() => console.log("MongoDB connected")) //If the connection is successful, it prints "MongoDB connected" to the console
    .catch(err => console.error("MongoDB connection error:", err));
//API Creation

app.get("/",(req,res)=>{ //sets up a route for your Express application, this means it listens for GET requests to the root URL (/) of your app
    res.send("Express App is Running") //Inside the function, sends back a message ("Express App is Running") to the user who visited the root URL

})

// Image Storage Engine

const storage = multer.diskStorage({ //creates a storage configuration for Multer, to handle file uploads
    destination: './upload/images', //specifies to save the file  in a folder called images inside an upload directory.
    filename:(req,file,cb)=>{  //defines how to name the uploaded file
       return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage}) //This line prepares Multer to handle file uploads, using the earlier storage settings for where to save the files and how to name them.
app.use((req, res, next) => { //This sets up a function that runs for every request to your app.
    //next -> lets the app continue to the next part of the code that handles the request.
    console.log(`${req.method} request to ${req.url}`); //It logs the type of request (like GET or POST) and the URL where the request is going.
    next();
});


//Creating Upload Endpoint for Images
app.use('/images', express.static('upload/images'))//When someone accesses the URL starting with /images, express will look for the files in the upload/images directory.
app.post("/upload", upload.single('product'),(req,res)=>{//o handle a single file upload from a form field named product.
    res.json({//sends back a response in JSON format
        success:1, //indicates file upload was successdul
        image_url:`http://localhost:${port}/images/${req.file.filename}` //creates a URL of the uploaded image

    })

})

// Schema for Creating Products

const Product = mongoose.model("Product",{ //creates a Mongoose model named Product
    //this model is a blueprint for how a products data will be structured in the database
    id:{
        type:Number,
        required: true,

    },
    name:{
        type:String,
        required:true,
    
    },
    image:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
    
    },
    new_price:{
        type:Number,
        required:true,
    
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,

    },

})

app.post('/addproduct', async (req, res) => {//This sets up a route that listens for POST requests at the /addproduct URL
   //The function is async, meaning it can perform actions that take time (like saving to a database) without blocking the server
    try {
        let products = await Product.find({});//retrieves all existing products from the database and waits for the result
        let id; //This declares a variable to hold the new product ID.
        
        if (req.body.id) {
            id = req.body.id; // Use the ID provided in the request
        } else {
            if (products.length > 0) {
                let last_product_array = products.slice(-1);
                let last_product = last_product_array[0];
                id = last_product.id + 1; // Increment the last ID
            } else {
                id = 1; // Start with 1 if no products exist
            }
        }
        const product = new Product({ //This creates a new product using the Product model and data sent in the req.body
            //The model helps validate the data before it's saved to the database.
            //If the incoming data doesn't match the defined structure
            // Mongoose will throw an error, preventing invalid data from being stored
            id: id, 
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();//saves the new product to the database.

        console.log("Product Saved:", product);
        res.json({ //If the product is saved successfully, it sends back a JSON response indicating success and includes the product name.
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


//Creating API for deleting Products
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })


})

//Creating API for getting all products

app.get('/allproducts', async(req,res)=>{
    //Set up a GET request route at the endpoint /allproducts
    //This is an asynchronous arrow function that handles the incoming request and prepares the response 
    let products = await Product.find({});//Use Mongoose’s find method to retrieve all product records from the database
    console.log("All Products Fetched")
    res.send(products);//Sends the fetched product data back to the client as a response

})

app.listen(port,(error)=>{//function starts the Express server and makes it listen for incoming connections on the specified port
    if(!error){
        console.log("Server Running on Port "+ port)
    }

    else{
        console.log("Error: "+error)
    }

})