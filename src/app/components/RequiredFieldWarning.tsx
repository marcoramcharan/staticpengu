import React from "react";
import "../styles/components/emptyFieldWarning.css";
import { FaExclamation } from "react-icons/fa6";

interface DisplayParagraphProps {
  attribute?: string;
}

const RequiredFieldWarning: React.FC<DisplayParagraphProps> = ({}) => {
  return (
    <div className="emptyFieldWarning">
      <FaExclamation style={{ color: "red" }} />
      <span>required</span>
    </div>
  );
};

export default RequiredFieldWarning;
