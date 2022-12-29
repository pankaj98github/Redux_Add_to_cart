import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="text-center">
        <div
          className="spinner-border"
          role="status"
          style={{ height: "3rem", width: "3rem", marginTop: "15rem", color:"blue" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
