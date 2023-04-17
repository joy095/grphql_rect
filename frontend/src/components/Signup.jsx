import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqlOperations/mutations";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

  if (loading) return <h2>Loading...</h2>;

  const handleChanege = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  return (
    <div>
      {error && <div>{error.message}</div>}
      {data && data.user && (
        <div>{data.user.firstName} is Signed up. You can Login now</div>
      )}
      <h5>Signup!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChanege}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChanege}
          required
        />
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
        <Link to="/login">
          <p>Already have account?</p>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
