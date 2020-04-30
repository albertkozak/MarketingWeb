import React from 'react';
import currency from "currency.js";

const AddVendorProduct = () => {
    const createProduct = async (event) => {
        event.preventDefault();
        const { productName, productPrice, } = event.target.elements;

        // Add POST Request here
        alert(`POST-request: ${productName.value} ${currency(productPrice.value)} `);
    };
    const clearForm = (event) => {
        event.preventDefault();
        document.getElementById('add-product-form').reset();
    };
    return (
        <div className="container">
            <h1 className="addProductTitle">Add Products</h1>
            <div >
                <form onSubmit={createProduct} id="add-product-form" className="addProductForm">
                    <input name="productName" type="text" placeholder="Product" />
                    <input name="productPrice" type="text" placeholder="Price" />


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
    );
};

export default AddVendorProduct;
