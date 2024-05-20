import React, { useState } from "react";
import { postRequest } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Cards = ({ onClose, onSubmit }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productAllergenInfo, setProductAllergenInfo] = useState("");

  const handleSubmit = async () => {
    try {
      await postRequest("/products", {
        name: productName,
        description: productDescription,
        allergenInfo: productAllergenInfo,
      });
      // Close the modal after successful submission
      onClose();

	  //submit our details
      onSubmit(productName, productDescription, productAllergenInfo);
    } catch (error) {
      console.error("Something went wrong...");
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Product
            </h5>
            <button type="button" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Product Description:</label>
                <textarea
                  className="form-control"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Allergen Info:</label>
                <input
                  type="text"
                  className="form-control"
                  value={productAllergenInfo}
                  onChange={(e) => setProductAllergenInfo(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
