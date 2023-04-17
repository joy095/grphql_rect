import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <h2>Loading...</h2>;
  if (error) {
    console.log(error.message);
  }
  if (data.quotes.length === 0) {
    return <h2>No Quotes Available</h2>;
  }

  return (
    <div>
      {data.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}>
              <p>~{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Home;
