import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editSkills.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: string[];
  updateData: (attr: string, value: any) => void;
}

const EditCompanyHR: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateData,
}) => {
  const [list, setList] = useState<string[]>(value || []);
  const [val, setVal] = useState<string>("");

  const add = () => {
    if (val.trim() !== "") {
      setList([...list, val]);
      setVal(""); // Clear the input field after adding
    }
  };

  const remove = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      add();
    }
  };

  const save = () => {
    updateData("hr_emails", list);
    onCancel();
  };

  return (
    <EditSection sectionName={"hr emails"} onCancel={onCancel} onSave={save}>
      <div className="editSkills">
        <div className="editSkillsContainer">
          {list?.map((item, index) => (
            <div key={index} className="box">
              <span> {item}</span>
              <MdDelete onClick={() => remove(index)} />
            </div>
          ))}
          {list?.length === 0 ? (
            <div className="nothing">
              <p>no emails</p>
            </div>
          ) : null}
        </div>
        <div className="editSkillsAdd">
          <input
            type="text"
            placeholder="email"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={add}>add email</button>
        </div>
      </div>
    </EditSection>
  );
};

export default EditCompanyHR;
