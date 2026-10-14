import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import "../styles/components/emptyFieldWarning.css";

interface DisplayParagraphProps {
  attribute: string;
}

const FieldInfo: React.FC<DisplayParagraphProps> = ({ attribute }) => {
  return (
    <div
      style={{ fontSize: "13px", fontStyle: "italic", color: "dodgerblue" }}
      className="emptyFieldWarning"
    >
      <CiCircleInfo style={{ color: "blue" }} />
      <span>{attribute}</span>
    </div>
  );
};

export default FieldInfo;
