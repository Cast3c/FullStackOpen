import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "../Total";

const Course = ({ courses }) => {
  return (
    <div>
        <h1>Web development Curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header courses={course} />
          <Content courses={course} />
          <Total course={course}/>
        </div>
      ))}
    </div>
  );
};

export default Course;
