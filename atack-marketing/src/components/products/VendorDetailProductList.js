import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import currency from "currency.js";
import { faTimes, faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../../Config";

export default function VendorDetailProductList(props) {
  const eventId = props.location.state.eventId;
  const eventName = props.location.state.eventName;
  const eventVendorId = props.location.state.eventVendorId;

  const DELETEPRODUCT_URL = `https://atackmarketingapi.azurewebsites.net/api`;

  const [fetchedData, setFetchedData] = useState([]);
  const [vendorDetails, setVendorDetails] = useState({});

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);

  function fetchData() {
    firebase
      .auth()
      .currentUser.getIdTokenResult()
      .then(tokenResponse => {
        fetch(BASE_URL + `Events/${eventId}/Vendors/${eventVendorId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenResponse.token}`
          }
        })
          .then(response => response.json())
          .then(responseData => {
            setVendorDetails(responseData);
            setFetchedData(responseData.vendor.products);
            console.log(responseData);
          });
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function createProduct(event) {
    event.preventDefault();
    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (JWToken !== null) {
      const result = await fetch(
        BASE_URL + `/EventVendor/${eventVendorId}/products/add`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWToken.token}`
          },
          body: JSON.stringify({
            productName: productName,
            productPrice: currency(productPrice)
          })
        }
      );
      if (result.status === 201) {
        console.log("succcess");
        fetchData();
        clearForm();
      } else {
        alert("Error: Something went wrong, please try again");
      }
    }
  }

  async function removeProduct(productId) {
    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (JWToken !== null) {
      const result = await fetch(
        DELETEPRODUCT_URL +
          `/EventVendor/${eventVendorId}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${JWToken.token}`
          }
        }
      );
      if (result.status === 200) {
        console.log("succcess");
        fetchData();
      } else {
        alert("Error: Something went wrong, please try again");
      }
    }
  }

  const clearForm = event => {
    //event.preventDefault();
    document.getElementById("add-product-form").reset();
  };
  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <>
      <div className="container">
        <h1 className="addProductTitle">Add Products</h1>
        <div>
          <form
            onSubmit={createProduct}
            id="add-product-form"
            className="addProductForm"
          >
            <input
              name="productName"
              type="text"
              placeholder="Product"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
            <input
              name="productPrice"
              type="number"
              step=".01"
              min="0"
              placeholder="Price"
              value={productPrice}
              onChange={e => setProductPrice(e.target.value)}
            />

            <div className="buttons">
              <button className="submit" variant="" type="submit">
                Add Product
              </button>
              <button className="cancel" onClick={clearForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {Object.keys(vendorDetails).length > 0 && (
        <div className="productList">
          <h3> {vendorDetails.vendor.vendorName}</h3> <h3>{eventName}</h3>
          <table className="productTable">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map(product => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{"$" + format(product.productPrice)}</td>
                  <td>
                    <FontAwesomeIcon
                      className="delete"
                      icon={faTimes}
                      onClick={e => removeProduct(product.productId)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon className="edit" icon={faEdit} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
