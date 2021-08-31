import React, { useEffect, useState } from "react";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import Navigation from "../components/Navigation/Navigation";
import data from "../data/countries.json";
import "./style.scss";

const CountryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundCountries, setFoundCountries] = useState(data);
  const [checkedList, setCheckedList] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      const result = foundCountries.map((country) => {
        if(!country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return { ...country, hidden: true }
        }
        return { ...country, hidden: false}
      });
      setFoundCountries(result);
    } 
    else {
      const data = foundCountries.map(country => {
        return { ...country, hidden: false }
      })
      setFoundCountries(data); // need in case, when the keyWord word was deleted
    }
  }, [searchTerm]);

  const selectCountry = (countryCode) => {
    return foundCountries.map((item) => {
      if (countryCode === item.code && item.selected ) {
        return {...item, selected: !item.selected}
      }
      if (countryCode === item.code ) {
        return {...item, selected: !selected}
      }
      return item;
    })
  }

  useEffect(() => {
    setCheckedList(foundCountries.filter((country) => {
      if(country.selected) {
        return {...country};
      }
    }));
  }, [foundCountries]);

  return (
    <div className="container">
      <Navigation />
      <div>
        <div className="mb-5">
          <input type="search" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
        </div>
        <div className="row select-field">
          {foundCountries &&
            (foundCountries?.length > 0 ? (
              <div className="col">
                <p className="fw-bold">Countries:</p>
                {foundCountries.map((item, i) => {
                  return (
                    <div key={item.code} className={`list-item mb-2 ${foundCountries[i]?.hidden? 'hidden': ''}`}>
                      <CustomCheckbox
                        selected={foundCountries[i]?.selected}
                        setSelected={() => setFoundCountries(selectCountry(item.code))}
                      />
                      <div className="ml-2">
                        {item?.name}
                        </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="col">No countries found</p>
            ))}
          <div className="col">
            <p className="fw-bold">Selected Countries:</p>
            {checkedList.length > 0 && (
              <div>
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
