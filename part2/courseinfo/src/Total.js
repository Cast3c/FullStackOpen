import React from "react";

const Total = ({ course }) => {
  const total = course.parts.reduce((t, b) => {
    console.log(b.exercises);
    return (t += b.exercises);
  }, 0);

  console.log();
  return <p><strong>Total of {total} exercises</strong></p>;
};

export default Total;
