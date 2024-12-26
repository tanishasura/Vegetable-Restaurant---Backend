import mongoose from 'mongoose';

const schemaProduct = new mongoose.Schema({
    name: String,
    category:String,
    image: String,
    price: String,
    description: String,
  });
  
  const productModel = mongoose.model("product",schemaProduct);
  export default productModel;