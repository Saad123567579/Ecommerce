const { Product } = require("../model/Product");

exports.createProduct = (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((doc) => {
      console.log(doc);
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Product.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).send("Could not find the product to delete");
    }

    res.status(200).send("Product successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


exports.getProducts = async (req, res) => {
    const { category, brand } = req.query;
    let query = {};
  
    if (category?.length > 0) {
      query.category = category;
    }
  
    if (brand?.length > 0) {
      query.brand = brand;
    }
  
    try {
      const products = await Product.find(query);
      if (!products) {
        return res.status(404).send("Products not found");
      }
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  };
  
exports.getProductsById = async (req, res) => {
  let { id } = req.params;
  try {
    const products = await Product.findById(id);
    if (!products) {
      return res.status(404).send("Products not found");
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    product = Object.assign(product, obj);

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

