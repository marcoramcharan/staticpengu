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

const EditEmployeeName: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateData
}) => {
  const [val, setVal] = useState<string>(value || ``);

  const save = () => {
    updateData('name', val)
    onCancel();
  };

  return (
    <EditSection sectionName={"name"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="name"
        />
      </div>
    </EditSection>
  );
};

export default EditEmployeeName;
