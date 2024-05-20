import React, { useState, useEffect } from "react";
import { getRequest } from "../../axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getRequest("/dashboard");
        setProducts(response.data);
      } catch (e) {
        console.error("Something went wrong.");
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //here we create a filter function such that it will not case sensitive by using filter
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(product.id).includes(searchTerm)
  );
  //here by clicking on check product will be removed and here we use filter to filter items by their ids
  const checkHandler = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5">Products</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ID or name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Selling Price</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.selling_price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => checkHandler(product.id)}
                >
                  Check
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Link to="/products" className="btn btn-primary">
        Go to products original list
      </Link>
    </div>
  );
};

export default Dashboard;
