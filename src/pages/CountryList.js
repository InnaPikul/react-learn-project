import React, { useEffect, useState } from "react";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import Navigation from "../components/Navigation/Navigation";
import data from "../data/countries.json";
import "./style.scss";

const CountryList = () => {
  const [initialData, setInitialData] = useState(data);
  const [country, setCountry] = useState("");
  const [foundCountries, setFoundCountries] = useState(initialData);
  const [checkedList, setCheckedList] = useState([]);
  const [selected, setSelected] = useState(false);

  // useEffect(() => {
  //   console.log('sync')
  //   setInitialData(initialData.map(item => ({...item, selected: false})));
  // }, []);

  const handleFilterChange = (event) => {
    const keyWord = event.target.value;
    if (keyWord !== "") {
      const result = initialData.filter((country) =>
        country.name.toLowerCase().includes(keyWord.toLowerCase())
      );
      setFoundCountries(result);
    } else {
      setFoundCountries(initialData);
    }
    setCountry(keyWord);
  };

  const handleCheck = (position, countryCode) => {
    

    setFoundCountries(
      foundCountries.map((item) => {
        if (countryCode === item.code && item.selected ) {
          return {...item, selected: !item.selected}
        }
        if (countryCode === item.code ) {
          return {...item, selected: !selected}
        }
        return item;
      })
    );

    const selectedCountryArr = foundCountries.filter((item) => {
      if(countryCode === item.code) {
        return {...item};
      }
    });

    setCheckedList((prevState) => {
      const theSameItem  = prevState.find((item) => item.code === selectedCountryArr[0].code);
      if (theSameItem) {
        prevState.map((item, i, arr) => {
          if(item.code === selectedCountryArr[0].code) {
            arr.splice(i, 1);
            //return prevState;
            return arr;
          }
        })
        return prevState;
      }
      return [...prevState, ...selectedCountryArr];
    });
    console.log('foundCountries', foundCountries);
    console.log('checkedList', checkedList);
  }

  console.log('foundCountries before r', foundCountries);
  console.log('checkedList before r', checkedList);

  return (
    <div className="container">
      <Navigation />
      <div>
        <div className="mb-5">
          <input type="search" value={country} onChange={handleFilterChange} />
        </div>
        <div className="row select-field">
          {foundCountries &&
            (foundCountries?.length > 0 ? (
              <div className="col">
                <p className="fw-bold">Countries:</p>
                {foundCountries.map((item, i) => {
                  return (
                    <div key={item.code} className="d-flex mb-2">
                      <CustomCheckbox
                        setSelected={() => handleCheck(i, item.code)}
                        selected={foundCountries[i]?.selected}
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
