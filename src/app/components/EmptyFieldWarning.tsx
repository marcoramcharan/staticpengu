import React from "react";
import { CiWarning } from "react-icons/ci";
import "../styles/components/emptyFieldWarning.css";

interface DisplayParagraphProps {
  attribute: string;
}

const EmptyFieldWarning: React.FC<DisplayParagraphProps> = ({ attribute }) => {
  return (
    <div className="emptyFieldWarning">
      <CiWarning style={{ color: "orange" }} />
      <span>no {attribute}</span>
    </div>
  );
};

export default EmptyFieldWarning;
