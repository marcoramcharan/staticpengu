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

const EditEmployeeAge: React.FC<TemplateProps> = ({
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
    updateData('age',val);
    onCancel();
  };

  return (
    <EditSection sectionName={"age"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <input value={val} onChange={handleChange} placeholder="Enter age" />
      </div>
    </EditSection>
  );
};

export default EditEmployeeAge;
