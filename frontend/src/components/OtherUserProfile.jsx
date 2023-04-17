import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER_BY_ID } from "../gqlOperations/queries";
import { useParams } from "react-router-dom";

const OtherUserProfile = () => {
  const { userid } = useParams();

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userid },
  });

  if (!localStorage.getItem("token")) {
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

export default OtherUserProfile;
