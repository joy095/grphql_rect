import React from "react";

import NavBar from "./components/NavBar";
import routes from "./routes";
import { useRoutes } from "react-router-dom";

const App = () => {
  const element = useRoutes(routes);
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
};

export default App;
