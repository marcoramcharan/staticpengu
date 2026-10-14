import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateData: (attr:string, value:any) => void;
}

const EditEmployeeWebsite: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateData,
}) => {
  const [val, setVal] = useState<string>(value || ``);

  const save = () => {
    updateData('website',val);
    onCancel();
  };

  return (
    <EditSection sectionName={"website"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="about"
        />
      </div>
    </EditSection>
  );
};

export default EditEmployeeWebsite;
