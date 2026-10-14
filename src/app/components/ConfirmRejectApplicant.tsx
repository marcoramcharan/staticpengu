import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateSkills: (font: string) => void;
}

const EditAbout: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateSkills,
}) => {
  const [val, setVal] = useState<string>(value || ``);

  const save = () => {
    updateSkills(val);
    onCancel();
  };

  return (
    <EditSection sectionName={"about"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="about"
        />
      </div>
    </EditSection>
  );
};

export default EditAbout;
