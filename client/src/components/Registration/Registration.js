import React, { useRef } from "react";
import "./Registration.css";
import { useSelector } from "react-redux";

const Registration = () => {
  const token = useSelector((state) => state.csrf.value);
  const password = useRef();
  const passwordConfirm = useRef();

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
        action={`${process.env.REACT_APP_HOSTNAME}:4000/api/user/signup`}
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
