import { useState, useEffect } from "react";
import "./style.scss";

const SearchInput = ({ foundItems, setFoundResult }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm !== "") {
          const result = foundItems.map((country) => {
            if(!country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return { ...country, hidden: true }
            }
            return { ...country, hidden: false}
          });
          setFoundResult(result);
        } 
        else {
          const data = foundItems.map(country => {
            return { ...country, hidden: false }
          })
          setFoundResult(data); // need in case, when the keyWord word was deleted
        }
      }, [searchTerm]);

    return (
        <input type="search" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
    );
};
export default SearchInput;
