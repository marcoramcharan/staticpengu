import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateValue: (attr: string, value:any) => void;
}

const EditJobDescription: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateValue,
}) => {
  const [val, setVal] = useState<string>(value || ``);

  const save = () => {
    updateValue('description',val);
    onCancel();
  };

  return (
    <EditSection sectionName={"description"} onCancel={onCancel} onSave={save}>
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

export default EditJobDescription;
