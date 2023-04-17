import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqlOperations/mutations";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signinUser, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });

  if (loading) return <h2>Loading...</h2>;

  const handleChanege = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <div>
      {error && <div>{error.message}</div>}
      <h5>Login!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChanege}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChanege}
          required
        />
        <Link to="/signup">
          <p>Don't have account?</p>
        </Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
