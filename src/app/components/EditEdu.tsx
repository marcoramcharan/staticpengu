import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editSkills.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: any[];
  updateSkills: (font: any[]) => void;
}

interface Skill {
  company: string;
  position: string;
  from_date: string;
  to_date: string;
}

const EditEdu: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateSkills,
}) => {
  const [list, setList] = useState<Skill[]>(value || []);
  const [val, setVal] = useState<Skill>({
    company: "",
    position: "",
    from_date: "",
    to_date: "",
  });

  const add = () => {
    if (
      val.company.trim() !== "" &&
      val.position.trim() !== "" &&
      val.from_date.trim() !== "" &&
      val.to_date.trim() !== ""
    ) {
      setList([...list, val]);
      setVal({ company: "", position: "", to_date: "", from_date: "" }); // Clear the input fields after adding
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
    updateSkills(list);
    onCancel();
  };

  return (
    <EditSection sectionName={"education"} onCancel={onCancel} onSave={save}>
      <div className="editSkills">
        <div className="editSkillsContainer">
          {list.map((item, index) => (
            <div className="box" key={index}>
            <div>
              <span>{item.position}</span>
              <span>{item.company}</span>
              <span>{item.from_date} - {item.to_date}</span>
            </div>

            <MdDelete onClick={() => remove(index)} />
          </div>
          ))}
          {list.length === 0 ? (
              <div className="nothing">
              <p>no skills</p>
              <span>
                <CiWarning className="warning"/>
                this section will be hidden
              </span>
            </div>
          ) : null}
        </div>
        <div className="editWeAdd">
          <div className="editWeAddLeft">
            <div className="bb">
              <input
                type="text"
                placeholder="position"
                value={val.company}
                onChange={(e) => setVal({ ...val, company: e.target.value })}
              />
              <input
                type="text"
                placeholder="compamy"
                value={val.position}
                onChange={(e) => setVal({ ...val, position: e.target.value })}
              />
            </div>
            <div className="bb">
              <input
                type="text"
                placeholder="from"
                value={val.to_date}
                onChange={(e) => setVal({ ...val, to_date: e.target.value })}
                onKeyDown={handleKeyDown}
              />
              <input
                type="text"
                placeholder="to"
                value={val.from_date}
                onChange={(e) => setVal({ ...val, from_date: e.target.value })}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <button onClick={add}>add</button>
        </div>
      </div>
    </EditSection>
  );
};

export default EditEdu;
