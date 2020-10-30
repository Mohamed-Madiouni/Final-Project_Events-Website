import React, { useEffect } from "react";
import { GET_ERRORS } from "../actions/types";
import { useDispatch } from "react-redux";

function Notifications() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }, []);

  return (
    <div>
      Hello
    </div>
  );
}

export default Notifications;
