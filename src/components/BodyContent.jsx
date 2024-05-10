import React from "react";
import subOptionContent from "../data/subOptionContent.json";

const BodyContent = ({ selectedSubOption }) => {
  const content = subOptionContent[selectedSubOption];

  return (
    <div className="p-4">
      <div>
        <h2>{content.title}</h2>
        <p>{content.content}</p>
      </div>
    </div>
  );
};

export default BodyContent;
