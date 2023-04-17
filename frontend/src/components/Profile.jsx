import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE } from "../gqlOperations/queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MY_PROFILE);

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h2>Unauthorized</h2>;
  }

  if (loading) return <h2>Profile is Loading...</h2>;
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div>
        <img
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h5>Email - {data.user.email} </h5>
      </div>
      <h3>Your quotes</h3>
      <blockquote>
        <h3>
          {data.user.quotes.map((quo) => {
            return (
              <blockquote>
                <h6>{quo.name} </h6>
              </blockquote>
            );
          })}
        </h3>
      </blockquote>
    </div>
  );
};

export default Profile;
