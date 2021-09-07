import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TabsContainer from "./components/TabsContainer";
import Home from "./pages/Home";
import CountryList from "./pages/CountryList";
import SliderPage from "./pages/SliderPage";
import CountryListWithAPI from "./pages/CountryListWithAPI";
import CountryListModified from "./pages/CountryListModified";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/list-api">
          <CountryListWithAPI />
        </Route>
        <Route path="/list-api-modified">
         <CountryListModified />
        </Route>
        <Route path="/list">
          <CountryList />
        </Route>
        <Route path="/tabs">
          <TabsContainer />
        </Route>
        <Route path="/slider">
          <SliderPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
