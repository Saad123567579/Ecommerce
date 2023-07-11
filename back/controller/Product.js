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

exports.deleteProduct = (req, res) => {
  //delete a product
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

exports.updateProduct = (req, res) => {
  //update products
};
