import React, { useReducer, useRef } from "react";
import { actionsTypesEnum, showToastAction, hideToastAction } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionsTypesEnum.SHOW_TOAST:
      return {
        ...state,
        showMessage: true,
        messageType: action.payload.messageType,
        messageBody: action.payload.messageBody,
      };
    case actionsTypesEnum.HIDE_TOAST:
      return { ...state, showMessage: false };
    default:
      break;
  }
};

export const ToastContext = React.createContext();

const initialState = {
  messageType: "success",
  messageBody: "This is a state message",
  delay: "1000",
  showMessage: false,
};

const NotifivationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useRef({
    onShowToast: (payload) => showToastAction(payload, dispatch),
    onHideToast: () => hideToastAction(dispatch),
  });

  return (
    <ToastContext.Provider value={{ state, actions: actions.current }}>
      {children}
    </ToastContext.Provider>
  );
};

export default NotifivationProvider;
