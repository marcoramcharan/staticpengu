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

const EditJobTitle: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateValue,
}) => {
  const [val, setVal] = useState<string>(value || ``);
  const [show, setShow] = useState<boolean>(false);

  const save = () => {
    if (val === "") {
      setShow(true);
      return;
    }
    updateValue("title", val);
    onCancel();
  };

  return (
    <EditSection sectionName={"title"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        {show ? <span>this field is required</span> : null}
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="about"
        />
      </div>
    </EditSection>
  );
};

export default EditJobTitle;
