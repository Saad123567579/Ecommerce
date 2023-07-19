const { Order } = require("../model/Order");

exports.createOrder = async(req, res) => {
  const order = new Order(req.body);
  try{
    order
    .save()
    .then((doc) => {
      console.log(doc);
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });;

  }
  catch{
    res.status(500).send("Some Error Ocurred while ordering");

  }


};

// exports.deleteProduct = (req, res) => {
//   //delete a product
// };

exports.getOrder = async (req, res) => {
    console.log(req.query.userid)
    try{
        if(req.query.userid === undefined){
          const orders = await Order.find();
          res.status(200).json(orders);

        } else {
          const orders = await Order.find({'userid':req.query.userid});
          res.status(200).json(orders);
        }
          
       
    }
    catch(e){
        res.status(500).send("Some Error Occurred");
    }


  };

  
exports.getOrderById = async (req, res) => {
    try{
        const {id} = req.params;
        const orders = await Order.findById(id);
        if(!orders){ return res.status(400).send("Unable to fetch")}
        return res.status(200).json(orders);
    }
    catch(e){
        return res.status(500).send(e);
    }

    

};

exports.updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const order = await Order.findByIdAndUpdate(id, update);

    if (!order) {
      return res.status(404).send("Could not find the order to update");
    }

    res.status(200).send("Successfully updated the order");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

  


