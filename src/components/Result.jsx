import React from "react";

const Result = ({ result }) => {
  return (
    <>
      {result && (
        <>
          {result.targetAmount.toFixed(2)}&nbsp;{result.currency}
        </>
      )}
    </>
  );
};

export default Result;
