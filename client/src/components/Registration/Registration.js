import React, { useEffect, useRef } from "react";
import "./Registration.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slices/csrfSlice";
import { getToken } from "../../Util/getToken";

const Registration = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.csrf.value);
  const password = useRef();
  const passwordConfirm = useRef();

  useEffect(() => {
    const data = getToken(`${process.env.REACT_APP_HOSTNAME}:4000/user/signup`);
    data.then((value) => {
      dispatch(setToken(value.csrfToken));
    });
  }, [dispatch]);

  const handleSubmit = (ev) => {
    if (password.current.value !== passwordConfirm.current.value) {
      ev.preventDefault();
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration</h2>
      <form
        onSubmit={handleSubmit}
        action={`${process.env.REACT_APP_HOSTNAME}:4000/user/signup`}
        method="post"
      >
        <div className="formfield">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="formfield">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" ref={password} required />
        </div>
        <div className="formfield">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirmation"
            ref={passwordConfirm}
            required
          />
        </div>
        <input type="hidden" name="_csrf" value={token} />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
