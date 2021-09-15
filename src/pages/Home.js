import React, { useContext, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import CustomToast from "../components/Toast/Toast";
import { ToastContext } from "../context";

const Home = () => {
  const [show, setShow] = useState(false);
  // const message = useContext(ToastContext);
  return (
    <ToastContext.Consumer> 
      { (message) => {
        return <div className="container">
          <Navigation />
          <h1>home page</h1>
          <button className="btn btn-secondary mb-4" onClick={() => setShow(true)}>
            Show message
          </button>
          <CustomToast show={show} setShow={setShow} message={message} />
        </div>

      }}
    </ToastContext.Consumer>
  );
};

export default Home;
