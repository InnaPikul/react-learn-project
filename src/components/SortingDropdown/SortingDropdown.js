import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

const SortingDropdown = ({ value, sortingMethods, onChange }) => {
  return (
    <DropdownButton
      onSelect={(e) => onChange(e)}
      variant="secondary"
      title={value}
      id="dropdown-size-small"
      size="sm"
    >
      {sortingMethods.map((item) => {
        return (
          <Dropdown.Item eventKey={item} key={item}>
            {item}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};
export default SortingDropdown;
