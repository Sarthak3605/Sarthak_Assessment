import { useState, useEffect } from "react"; //Hooks
import { getRequest, postRequest } from "../axios";

const UseHooks = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //first we fetch products and use getRequest for it, we imported from axios file

  useEffect(() => {
    const fetchProduct = async () => {
      // after asynchronous function we create try catch block to catch error and run code efficiently
      try {
        const response = await getRequest("/products");
        setProducts(response.data); //set the data we stored in response const type of variable
        setLoading(false); //stop the loading
      } catch (e) {
        setError("Something went wrong.");
      } finally {
        setLoading(false); //this will run independently
      }
    };

    fetchProduct();
  }, []);

  //now we create async to add products

  const addProducts = async (newProduct) => {
    try {
      await postRequest("/products", newProduct);

      //here we refresh our product lists after successfull posting the request

      const response = await getRequest("/product");
      setProducts(response.data);
    } catch (e) {
      setError("Something went wrong!!!");
    }
  };

  return { products, loading, error, addProducts };
};
export default UseHooks;
