import React, { useEffect, useState } from "react";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import Navigation from "../components/Navigation/Navigation";
import data from "../data/countries.json";
import "./style.scss";

const CountryListModified = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundCountries, setFoundCountries] = useState(data);
  const [checkedList, setCheckedList] = useState({});
  const [selected, setSelected] = useState(false);
  const [keysOfCountries, setKeysOfCountries] = useState({});

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

  const selectCountry = (key, prevState) => {
    let newKeysOfCountries = {...prevState};
    newKeysOfCountries[key] = !newKeysOfCountries[key];
    // console.log(newKeysOfCountries);
    return newKeysOfCountries;
  }

  const addList = (key, prevState) => {
    let newArr = {...prevState};
    newArr[key] = foundCountries.filter((country, i) => {
      if(country.code === key) {
        return country;
      }
    
    });
    console.log('newArr[key]', newArr[key]);
  }

  const handleSelect = (key) => {
    setKeysOfCountries((prevState) => selectCountry(key, prevState));
    // let newArr = {};
    // foundCountries.filter((country, i) => {
    //   if(country.code === key) {
    //     newArr[key] = country;
    //     console.log('res', newArr);
    //     return newArr;
    //   }
    // });
    // console.log('newArr before set ', newArr);
    // setCheckedList(newArr)
    setCheckedList((prevState) => addList(key, prevState))
  }

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
                        selected={keysOfCountries[item.code]}
                        // setSelected={() => setKeysOfCountries((prevState) => selectCountry(item.code, prevState))}
                        setSelected={() => handleSelect(item.code)}
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
            {checkedList?.length > 0 && (
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
export default CountryListModified;
