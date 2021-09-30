import React, { useState, useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import Navigation from "../components/Navigation/Navigation";
import SearchInput from "../components/SearchInput/SearchInput";
import SortingDropdown from "../components/SortingDropdown/SortingDropdown";
import data from "../data/countries.json";
import "./style.scss";
import { useSorting } from "../hooks/useSorting";

const CountryListModified = () => {
  const [foundCountries, setFoundCountries] = useState(data);
  const [keysOfCountries, setKeysOfCountries] = useState({});
  const [sortingMethod, setSortingMethod] = useState("From A to Z");

  const sortingMethods = ['From A to Z', 'From Z to A'];

  const updateKeys = (code, prevState) => {
    let newKeysOfCountries = { ...prevState };
    newKeysOfCountries[code] = !newKeysOfCountries[code];
    return newKeysOfCountries;
  };

  const selectedCountries = useMemo(() => {
    return foundCountries.filter((country) => keysOfCountries[country.code]);
  }, [keysOfCountries]);

  const sortedArray = useSorting(foundCountries, sortingMethod);
  
  const handleSorting = (method) => {
    setSortingMethod(method);
    setFoundCountries(sortedArray);
  }

  return (
    <div className="container">
      <Navigation />
      <div>
        <Row xs="auto" className="mb-5">
          <Col>
            <SortingDropdown
              value={sortingMethod}
              onChange={handleSorting}
              sortingMethods={sortingMethods}
            />
          </Col>
          <Col>
            <SearchInput
              foundItems={foundCountries}
              setFoundResult={setFoundCountries}
            />
          </Col>
        </Row>
        <div className="row select-field">
          {sortedArray &&
            (sortedArray?.length > 0 ? (
              <div className="col">
                <p className="fw-bold">Countries:</p>
                {sortedArray.map((item, i) => {
                  return (
                    <div
                      key={item.code}
                      className={`list-item mb-2 ${
                        sortedArray[i]?.hidden ? "hidden" : ""
                      }`}
                    >
                      <CustomCheckbox
                        selected={keysOfCountries[item.code]}
                        setSelected={() =>
                          setKeysOfCountries(
                            updateKeys(item.code, keysOfCountries)
                          )
                        }
                      />
                      <div className="mx-2">{item?.name}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="col">No countries found</p>
            ))}
          <div className="col">
            <p className="fw-bold">Selected Countries:</p>
            <div>
              {selectedCountries.map((item) => {
                return (
                  <div key={item.code} className="mb-2">
                    <div>{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryListModified;
