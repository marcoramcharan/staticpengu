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

const EditJobReceiverEmail: React.FC<TemplateProps> = ({
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
    updateValue("reciever_email", val);
    onCancel();
  };

  return (
    <EditSection sectionName={"reciever email"} onCancel={onCancel} onSave={save}>
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

export default EditJobReceiverEmail;
