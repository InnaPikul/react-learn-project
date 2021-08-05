import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import TabContent from "./TabContent";
import Tabs from "./Tabs";

const TabsContainer = () => {
  const tabItems = [
    {
      id: 0,
      title: "Tab red",
      content: "red",
    },
    {
      id: 1,
      title: "Tab green",
      content: "green",
    },
    {
      id: 2,
      title: "Tab blue",
      content: "blue",
    },
  ];

  const [color, setColor] = useState("#DEDCE4");

  const handleColorSwitch = (color) => {
    setColor(color);
  };
  const style = {
    background: color,
  };

  return (
    <div className="container">
      <Navigation />
      <div className="bg p-3" style={style}>
        <Tabs tabItems={tabItems}>
          {(tabIndex) => {
            switch (tabIndex) {
              case 0:
                return (
                  <TabContent
                    tabIndex={tabIndex}
                    backgroundColor={"#DB93A5"}
                    valueColor={"#DB93A5"}
                    onChange={handleColorSwitch}
                  />
                );
              case 1:
                return (
                  <TabContent
                    tabIndex={tabIndex}
                    backgroundColor={"#C7CDC5"}
                    valueColor={"#C7CDC5"}
                    onChange={handleColorSwitch}
                  />
                );
              case 2:
                return (
                  <TabContent
                    tabIndex={tabIndex}
                    backgroundColor={"#8EA4C8"}
                    valueColor={"#8EA4C8"}
                    onChange={handleColorSwitch}
                  />
                );
              default:
                return null;
            }
          }}
        </Tabs>
      </div>
    </div>
  );
};

export default TabsContainer;
