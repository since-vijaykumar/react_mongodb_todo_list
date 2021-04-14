import React from "react";
import { Link } from "react-router-dom";
function Error() {
  return (
    <div className="container">
      <h1>Invalid User </h1>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Error;
