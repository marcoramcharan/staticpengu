import { useState } from "react";
import "../styles/components/editName.css";
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  updateSkills: (navbar: string) => void;
  value: string;
}

const EditFooter: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateSkills,
}) => {
  const [val, setVal] = useState(value);

  const save = () => {
    updateSkills(val);
    onCancel();
  };

  return (
    <EditDetail detailName={"footer"} onCancel={onCancel} onSave={save}>
      <div className="editName">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          type="text"
          placeholder="footer text"
        />
      </div>
    </EditDetail>
  );
};

export default EditFooter;
