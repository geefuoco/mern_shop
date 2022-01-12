import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/slices/navbarSlice";
import "./Backdrop.css";

const Backdrop = () => {
  const show = useSelector((state) => state.navMenu.value);
  const dispatch = useDispatch();
  return (
    show && <div className="backdrop" onClick={() => dispatch(toggle())}></div>
  );
};

export default Backdrop;
