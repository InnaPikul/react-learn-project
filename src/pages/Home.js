import React, { useContext } from "react";
import Navigation from "../components/Navigation/Navigation";
import { ToastContext } from "../NotificationProvider";

const Home = () => {
  const { actions } = useContext(ToastContext);

  return (
    <div className="container">
      <Navigation />
      <h1>home page</h1>
      <button
        className="btn btn-secondary mb-4"
        onClick={() =>
          actions.onShowToast({ messageType: "success", messageBody: "YYYY" })
        }
      >
        Show message
      </button>
    </div>
  );
};

export default Home;
