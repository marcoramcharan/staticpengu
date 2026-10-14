import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editSkills.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  onSave: () => void;
  sectionName?: string;
  value: string[];
  updateSoftSkills: (font: string[]) => void;
}

const EditSoftSkills: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateSoftSkills,
  onSave
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
    updateSoftSkills(list);
    onCancel();
  };

  return (
    <EditSection sectionName={"skills"} onSave={onSave} onCancel={save}>
      <div className="editSkills">
        <div className="editSkillsContainer">
          {list?.map((item, index) => (
            <div key={index} className="box">
              <span> {item}</span>
              <MdDelete onClick={() => remove(index)} />
            </div>
          ))}
          {list?.length === 0 ? <div className="nothing">
            <p>no soft skills</p>
            <span>this section will be hidden</span>
          </div> : null}
        </div>
        <div className="editSkillsAdd">
          <input
            type="text"
            placeholder="soft skill"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={add}>add skill</button>
        </div>
      </div>
    </EditSection>
  );
};

export default EditSoftSkills;
