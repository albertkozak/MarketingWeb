import React, { useState, useEffect, useRef } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import currency from "currency.js";
import { faTimes, faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL } from "../../Config";
import { QRCode } from "react-qr-svg";

export default function VendorDetailProductList(props) {
  const eventId = props.location.state.eventId;
  const eventName = props.location.state.eventName;
  const eventVendorId = props.location.state.eventVendorId;

  const [fetchedData, setFetchedData] = useState([]);
  const [vendorDetails, setVendorDetails] = useState({});

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [updatingProdcut, setUpdatingProduct] = useState(null);
  const inputProductName = useRef();

  function fetchData() {
    setUpdatingProduct(null);
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
            setVendorDetails(responseData.vendor);
            setFetchedData(responseData.vendor.products);
            console.log(responseData);
          });
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function createProduct(event) {
    setUpdatingProduct(null);
    event.preventDefault();
    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (productName.trim().length === 0) {
      alert("Please Fill In The Product Name");
      return;
    }

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
        setProductName("");
        setProductPrice("");
        inputProductName.current.focus();
      } else {
        alert("Error: Something went wrong, please try again");
      }
    }
  }

  async function updateProduct(event) {
    event.preventDefault();
    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (productName.trim().length === 0) {
      alert("Please Fill In The Product Name");
      return;
    }

    if (JWToken !== null) {
      const result = await fetch(
        BASE_URL +
          `/EventVendor/${eventVendorId}/products/${updatingProdcut.productId}`,
        {
          method: "PUT",
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
      if (result.status === 200) {
        console.log("succcess");
        fetchData();
        setProductName("");
        setProductPrice("");
        setUpdatingProduct(null);
      } else {
        alert("Error: Something went wrong, please try again");
      }
    }
  }

  async function removeProduct(productId) {
    setUpdatingProduct(null);
    let JWToken = await firebase.auth().currentUser.getIdTokenResult();

    if (JWToken !== null) {
      const result = await fetch(
        BASE_URL + `/EventVendor/${eventVendorId}/products/${productId}`,
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

  //Utility Functions
  function clearForm(event) {
    event.preventDefault();
    setProductName("");
    setProductPrice("");
  }

  function updateProductButton(product) {
    setUpdatingProduct(product);
    setProductName(product.productName);
    setProductPrice(product.productPrice);
    inputProductName.current.focus();
    window.scrollTo({
      behavior: "smooth",
      top: 0
    });
  }

  function format(amount) {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    <div className="container">
      <h1 className="addProductTitle">Manage Products</h1>
      <div className="qrGenerator">
        {Object.keys(vendorDetails).length > 0 && (
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify({
              eventId: eventId,
              eventVendorId: eventVendorId,
              vendorName: vendorDetails.vendorName
            })}
          />
        )}
      </div>
      <div>
        <form id="add-product-form" className="addProductForm">
          <input
            ref={inputProductName}
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
            {updatingProdcut !== null ? (
              <button className="submit" variant="" onClick={updateProduct}>
                Update
              </button>
            ) : (
              <button className="submit" variant="" onClick={createProduct}>
                Add Product
              </button>
            )}

            <button className="cancel" onClick={clearForm}>
              Reset
            </button>
          </div>
        </form>
      </div>

      {Object.keys(vendorDetails).length > 0 &&
        vendorDetails.products.length > 0 && (
          <div className="productList">
            <h3> {vendorDetails.vendorName}</h3> <h3>{eventName}</h3>
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
                        onClick={e =>
                          window.confirm(
                            `Are You Sure You Want To Delete: ${product.productName}`
                          ) && removeProduct(product.productId)
                        }
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        className="edit"
                        icon={faEdit}
                        onClick={() => updateProductButton(product)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      {Object.keys(vendorDetails).length > 0 &&
        vendorDetails.products.length === 0 && <p>No Products Yet!</p>}
    </div>
  );
}
