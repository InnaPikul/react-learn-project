import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import CustomToast from "../components/Toast/Toast";

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="container">
      <Navigation />
      <h1>home page</h1>
      <button className="btn btn-secondary mb-4" onClick={() => setShow(true)}>
        Show message
      </button>
      <CustomToast show={show} setShow={setShow} />
    </div>
  );
};

export default Home;
