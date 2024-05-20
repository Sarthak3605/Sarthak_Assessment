import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(true);
  const [allergenInfo, setAllergenInfo] = useState(true);
  const [usage, setUsage] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getRequest(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Skeleton count={100} width={"100%"} height={30} />;
  }

  if (!product) {
    return <p>Product not available!</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card product-details">
        <div className="card-body">
          <h2 className="card-title text-center">{product.name}</h2>
          <img
            src={product.productImage}
            alt={product.name}
            className="img-fluid mb-3"
          />

          <div className="section">
            <h3
              className="cursor-pointer"
              onClick={() => setDescription(!description)}
            >
              Description
            </h3>
            {description && <p className="card-text">{product.description}</p>}
          </div>

          <div className="section">
            <h3
              className="cursor-pointer"
              onClick={() => setAllergenInfo(!allergenInfo)}
            >
              Allergen Information
            </h3>
            {allergenInfo && (
              <p className="card-text">{product.allergen_info}</p>
            )}
          </div>

          <div className="section">
            <h3 className="cursor-pointer" onClick={() => setUsage(!usage)}>
              Usage Instructions
            </h3>
            {usage && (
              <p className="card-text">{product.cooking_instruction}</p>
            )}
          </div>

          <p className="price text-success">
            Selling Price: ₹{product.selling_price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
