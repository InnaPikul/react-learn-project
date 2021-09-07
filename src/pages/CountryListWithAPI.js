import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomCheckbox from "../components/CustomCheckbox/CustomCheckbox";
import Navigation from "../components/Navigation/Navigation";
import "./style.scss";

const CountryListWithAPI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundPersons, setFoundPersons] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [selectedInitial, setSelected] = useState(false);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people')
        .then(payload => {
          const data = payload.data.results;
          let formattedData = {};
          for(let i = 0; i < data.length; i++) {
            let id = data[i].name.toLowerCase().replace(/ +/g, "");
            formattedData[id] = data[i];
            formattedData[id].hidden = false;
            formattedData[id].selected = false;
          }
          console.log('formattedData', formattedData);
          setFoundPersons(formattedData);
        })
  }, []);

  useEffect(() => {
    const result = {};
    if (searchTerm !== "") {
      for(let key in foundPersons) {
        result[key] = foundPersons[key];
        if(!foundPersons[key].name.toLowerCase().includes(searchTerm.toLowerCase())) {
          result[key].hidden = true;
        } else {
          result[key].hidden = false;
        }
      };
      setFoundPersons(result);
    } 
    else {
      for(let key in foundPersons) {
        result[key] = foundPersons[key];
        result[key].hidden = false;
      };
      setFoundPersons(result); // need in case, when the keyWord word was deleted
    }
  }, [searchTerm]);

  const selectPerson = (key) => {
    let newObj = {...foundPersons};
    newObj[key].selected = !foundPersons[key].selected;
    return newObj;
  }

  useEffect(() => {
    console.log(foundPersons);
    let newCheckedList = {};
    for (let key in foundPersons) {
      if(foundPersons[key].selected) {
        newCheckedList[key] = foundPersons[key];
        console.log('newCheckedList', newCheckedList);
        return newCheckedList;
      }
    }
    setCheckedList(newCheckedList);
  }, [foundPersons]);

  return (
    <div className="container">
      <Navigation />
      <div>
        <h1>With API</h1>
        <div className="mb-5">
          <input type="search" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
        </div>
        <div className="row select-field">
          {(foundPersons ? (
              <div className="col">
                <p className="fw-bold">Countries:</p>
                {Object.keys(foundPersons).map((item, i) => {
                  return (
                    <div key={item} className={`list-item mb-2 ${foundPersons[item].hidden ? 'hidden': ''}`}>
                      <CustomCheckbox
                        selected={foundPersons[item]?.selected}
                        setSelected={() => setFoundPersons(selectPerson(item))}
                      />
                      <div className="ml-2">
                        {foundPersons[item].name}
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
                {checkedList &&
              <div>
                  {Object.keys(checkedList).map((item) => {
                    console.log('checkedList', checkedList);
                    return (
                      <div key={item} className="mb-2">
                        <div>{checkedList[item].name}</div>
                      </div>
                    );
                  })}

              </div>
                }
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountryListWithAPI;