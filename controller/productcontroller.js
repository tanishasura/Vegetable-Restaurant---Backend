import productModel from "../model/productmodel.js";

export const uploadProduct = async (req, res) => {
  //   console.log(req.body);
  try {
    const product = new productModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product Uploaded!",
      success: true,
      savedProduct,
    });
  } catch (error) {
    // console.error("Error uploading product:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const getProducts = await productModel.find({});
    // console.log(getProducts);
    res.json(getProducts);
  } catch (error) {
    console.error("Error getting products:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

// export const updateData = async (req, res) => {
//   try {
//     const getProducts = await productModel.find();
//     const changedData = getProducts.map(async (products) => {
//       const newProduct = await productModel.findByIdAndUpdate(products.id, {
//         name: products.name,
//         category: products.image,
//         image: products.category,
//         price: products.price,
//         description: products.description,
//       });
//       return newProduct;
//     });
//     res.json({success: true});
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//       error,
//     });
//   }
// };
