import React from "react";

const VendorItemSL = (props) => {
  const vendor = props.vendor;

  return (
    <div className="vendorSL">
      <p className="vendorName">{vendor.vendorName}</p>
    </div>
  );
};

export default VendorItemSL;
