import React, { useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slices/csrfSlice";
import { getToken } from "../../Util/getToken";

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.csrf.value);

  useEffect(() => {
    const data = getToken(`${process.env.REACT_APP_HOSTNAME}:4000/user/signin`);
    data.then((value) => {
      dispatch(setToken(value.csrfToken));
    });
  }, [dispatch]);

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form
        action={`${process.env.REACT_APP_HOSTNAME}:4000/user/signin`}
        method="post"
      >
        <div className="formfield">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>

        <div className="formfield">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <input type="hidden" name="_csrf" value={token} />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
