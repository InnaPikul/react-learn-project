import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

const SortingDropdown = ({sortingArray, setSortingArray}) => {
  const [sortingMethod, setSortingMethod] = useState("Sort");

  const sortAlphabetically = () => {
    const result = [...sortingArray].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setSortingArray(result);
  };

  const sortReverseAlphabetically = () => {
    const result = [...sortingArray].sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    setSortingArray(result);
  };

  return (
    <DropdownButton
      onSelect={(e) => setSortingMethod(e)}
      variant="secondary"
      title={sortingMethod}
      id="dropdown-size-small"
      size="sm"
    >
      <Dropdown.Item eventKey="From A to Z" onClick={sortAlphabetically}>
        From A to Z
      </Dropdown.Item>
      <Dropdown.Item eventKey="From Z to A" onClick={sortReverseAlphabetically}>
        From Z to A
      </Dropdown.Item>
    </DropdownButton>
  );
};
export default SortingDropdown;
