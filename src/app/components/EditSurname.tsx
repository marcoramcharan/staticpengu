import { useState } from "react";
import "../styles/components/editSurname.css";
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateSkills: (font: string) => void;
}

const EditSurname: React.FC<TemplateProps> = ({
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
    <EditDetail onSave={save} detailName={"surname"} onCancel={save}>
      <div className="editName">
        <input
          type="text"
          placeholder="surname"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />{" "}
      </div>
    </EditDetail>
  );
};

export default EditSurname;
