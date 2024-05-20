import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import UseHooks from "../UseHooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsList = () => {
  const { products, loading, error, addProducts } = UseHooks();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const sortedProducts = useMemo(() => {
    return products.sort((a, b) => a.selling_price - b.selling_price);
  }, [products]);

  const ProductPage = (id) => {
    navigate(`/products/${id}`);
  };

  const addModal = () => {
    setShowModal(true);
    console.log("added click successfully");
  };

  function hideModal() {
    console.log("Hide successfully");
    setShowModal(false);
  }

  const SubmitHandler = async (
    productName,
    productDescription,
    productAllergenInfo
  ) => {
    addProducts({
      name: productName,
      description: productDescription,
      allergenInfo: productAllergenInfo,
    });
    hideModal();
  };

  if (loading) return <Skeleton count={100} width={"100%"} height={30} />;
  if (error)
    return (
      <div className="alert alert-danger">
        <h2>Something went wrong...</h2>
      </div>
    );

  return (
    <div className="container">
      <h1 className="text-center mb-5">Products</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="col"
            onClick={() => ProductPage(product.id)}
          >
            <div className="card h-100">
              <img
                src={product.productImage}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Selling Price:</strong> ₹{product.selling_price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addModal} className="btn btn-primary mt-5">
        Add Product
      </button>
      {showModal && <Cards onClose={hideModal} onSubmit={SubmitHandler} />}
    </div>
  );
};

export default ProductsList;
