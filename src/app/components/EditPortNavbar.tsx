import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  updateNavbar: (navbar: string) => void;
  value: string;
}

const EditPortNavbar: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateNavbar,
}) => {
  const [val, setVal] = useState(value);

  const save = () => {
    updateNavbar(val);
    onCancel();
  };

  return (
    <EditSection sectionName={"navbar"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="navbar text"
        />
      </div>
    </EditSection>
  );
};

export default EditPortNavbar;
