import { useState } from "react";
import "../styles/components/editName.css";
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string;
  updateData: (attr: string, value: any) => void;
}

const EditCompanyName: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateData,
}) => {
  const [val, setVal] = useState<string>(value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCancel();
    }
  };

  const save = () => {
    updateData("name", val);
    onCancel();
  };
  return (
    <EditDetail detailName={"name"} onCancel={onCancel} onSave={save}>
      <div className="editName">
        <input
          type="text"
          placeholder="name"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </EditDetail>
  );
};

export default EditCompanyName;
