import React from "react";
import Select from "react-dropdown-select";
import { useHistory } from "react-router-dom";

export default function VendorInputSelector(props) {
  const history = useHistory();

  function addVendor(vendorName) {
    history.push("/addvendor", { vendorName: vendorName.value });
  }


  return (
    <Select
      //multi
      create
      onCreateNew={item => addVendor(item)}
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
