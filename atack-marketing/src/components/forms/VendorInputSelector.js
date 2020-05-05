import React from "react";
import Select from "react-dropdown-select";


export default function VendorInputSelector(props) {

  return (
    <Select
      //multi
      searchable
      searchBy="label"
      name="vendorId"
      placeholder="Select a vendor"
      options={props.options}
      value={props.values}
      onChange={props.handleVendorSelect}
    />
  );
}
