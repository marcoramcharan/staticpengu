import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  value: string;
  updateValue: (attr: string, value: any) => void;
}

const EditJobType: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateValue,
}) => {
  const [val, setVal] = useState<string>(value || "office");

  const save = () => {
    updateValue("work_type", val);
    onCancel();
  };

  return (
    <EditSection sectionName={"type"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <label>
          <input
            type="radio"
            value="office"
            checked={val === "office"}
            onChange={(e) => setVal(e.target.value)}
          />
          Work
        </label>
        <label>
          <input
            type="radio"
            value="home"
            checked={val === "home"}
            onChange={(e) => setVal(e.target.value)}
          />
          Home
        </label>
        <label>
          <input
            type="radio"
            value="hybrid"
            checked={val === "hybrid"}
            onChange={(e) => setVal(e.target.value)}
          />
          Hybrid
        </label>
      </div>
    </EditSection>
  );
};

export default EditJobType;
