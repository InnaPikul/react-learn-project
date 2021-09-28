export const actionsTypesEnum = {
    SHOW_TOAST: "SHOW_TOAST",
    HIDE_TOAST: "HIDE_TOAST"
}

export const showToastAction = (payload, dispatch) => {
    return dispatch({ type: actionsTypesEnum.SHOW_TOAST, payload });
};

export const hideToastAction = (dispatch) => {
    return dispatch({ type: actionsTypesEnum.HIDE_TOAST });
};
