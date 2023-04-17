import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE } from "../gqlOperations/mutations";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";

const CreateQuote = () => {
  const [quote, setQuote] = useState();
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuote", "getMyProfile"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) {
    console.log(error.message);
  }
  if (data) {
    console.log(data);
  }
  return (
    <div>
      {error && <div>{error.message}</div>}
      {data && <div>{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="write your quote here"
        />
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateQuote;
