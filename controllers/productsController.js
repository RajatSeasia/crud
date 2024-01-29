import userProducts from '../models/productsModels.js'


export const createUserProducts = async (req, res) => {
    const { title, image,quantity, price, createdAt,description, updateAt,cart,like } = req.body;
    try {
      const products = new userProducts({
        title,
        image,
        quantity,
        price,
        description,
        createdAt,
        updateAt,
        like,
        cart
      });
  
      await products.save();
      res.status(200).json("products Created successfully"); // returning data with status code 200
    } catch (error) {
      // this is for throwing error
      res.status(400).json({ error: error });
    }
  };