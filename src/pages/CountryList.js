import React, { useState } from "react";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import Navigation from "../components/Navigation/Navigation";
import data from "../data/countries.json";
import "./style.scss";

const CountryList = () => {
  const [country, setCountry] = useState("");
  const [foundCountries, setFoundCountries] = useState(data);
  const [itemChecked, setItemChecked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);

  const handleFilterChange = (event) => {
    const keyWord = event.target.value;
    if (keyWord !== "") {
      const result = data.filter((country) =>
        country.name.toLowerCase().includes(keyWord.toLowerCase())
      );
      setFoundCountries(result);
    } else {
      setFoundCountries(data);
    }
    setCountry(keyWord);
  };

  const handleCheckboxChange = () => {
    
  }

  return (
    <div className="container">
      <Navigation />
      <div>
        <div className="mb-5">
          <input type="search" value={country} onChange={handleFilterChange} />
        </div>
        <div className="row select-field">
          {foundCountries &&
            (foundCountries.length > 0 ? (
              <div className="col">
                {foundCountries.map((item) => {
                  return (
                    <div key={item.code} className="d-flex mb-2">
                      <CustomCheckbox onChange={handleCheckboxChange} />
                      <div className="ml-2">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col">No countries found</div>
            ))}
          <div className="col">
            {checkedList && (
              <div className="col">
                {checkedList.map((item) => {
                  return (
                    <div key={item.code} className="mb-2">
                      <div>{item.name}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryList;
