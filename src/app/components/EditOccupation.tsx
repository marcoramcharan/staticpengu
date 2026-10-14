import { useState } from "react";
import "../styles/components/editOccupation.css";
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateSkills: (font: string) => void;
}

const EditOccupation: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateSkills,
}) => {
  const [val, setVal] = useState<string>(value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCancel();
    }
  };

  const save = () => {
    updateSkills(val);
    onCancel();
  };

  return (
    <EditDetail detailName={"occupation"} onSave={save} onCancel={onCancel}>
      <div className="editOccupation">
        <input
          type="text"
          placeholder="occupation"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />{" "}
      </div>
    </EditDetail>
  );
};

export default EditOccupation;
