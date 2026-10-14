import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateValue: (attr: string, value: any) => void;
}

const EditJobSalary: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateValue,
}) => {
  const [val, setVal] = useState<string>(value || ``);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setVal(onlyNumbers);
  };

  const save = () => {
    updateValue("salary", val);
    onCancel();
  };

  return (
    <EditSection sectionName={"salary"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <input value={val} onChange={handleChange} placeholder="Enter salary" />
      </div>
    </EditSection>
  );
};

export default EditJobSalary;
