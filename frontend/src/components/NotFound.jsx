import React from "react";

const NotFound = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>404 Not Found</h1>
      <iframe
        src="https://giphy.com/embed/VwoJkTfZAUBSU"
        width="332"
        height="480"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
        title="not found"
      ></iframe>
    </div>
  );
};

export default NotFound;
