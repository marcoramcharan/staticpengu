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

const EditCompanyWorkForce: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateData,
}) => {
  const [val, setVal] = useState<string>(value || ``);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setVal(onlyNumbers);
  };

  const save = () => {
    updateData('work_force', val);
    onCancel();
  };

  return (
    <EditSection sectionName={"work force"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <input value={val} onChange={handleChange} placeholder="Enter work force" />
      </div>
    </EditSection>
  );
};

export default EditCompanyWorkForce;
