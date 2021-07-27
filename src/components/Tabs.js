import React, { useState }  from "react";

const Tabs = (props) => {
  const [tabIndex, setTabIndex] = useState(1);

  const handleTabSwitching = (index) => {
    setTabIndex(index);
  };

  return (
    <>
    <div className="tab-navigation flex">
        {props.tabItems.map((item, index) => {
            return <button
            key={item.id}
            className={props.isActive === index ? "nav-button active" : 'nav-button'}
            onClick={() => handleTabSwitching(index)}

          >{item.title}
          </button>
        })}
    </div>
    {props.children(tabIndex)}
    </>
  );
};

export default Tabs;
