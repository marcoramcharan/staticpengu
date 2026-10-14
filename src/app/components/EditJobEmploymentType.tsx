import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  value: string;
  updateValue: (attr: string, value: any) => void;
}

const EditJobEmploymentType: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateValue,
}) => {
  const [val, setVal] = useState<string>(value || "work");

  const save = () => {
    updateValue("employment_type", val);
    onCancel();
  };

  return (
    <EditSection sectionName={"type"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <label>
          <input
            type="radio"
            value="permanent"
            checked={val === "permanent"}
            onChange={(e) => setVal(e.target.value)}
          />
          permanent
        </label>
        <label>
          <input
            type="radio"
            value="temporary"
            checked={val === "temporary"}
            onChange={(e) => setVal(e.target.value)}
          />
          temporary
        </label>
      </div>
    </EditSection>
  );
};

export default EditJobEmploymentType;
