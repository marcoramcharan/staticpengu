import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editSkills.css";
import { useState } from "react";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: any[];
  updateSkills: (font: any[]) => void;
}

const EditContact: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateSkills,
}) => {
  console.log(`edit contact value: `, value, updateSkills);

  const save = () => {
    onCancel();
  };

  interface contact {
    label: string;
    value: string;
    type: string;
  }

  const [con, setCon] = useState<contact[]>([
    { label: "email", value: value[0].value, type: "" },
    { label: "call", value: value[1].value, type: "" },
    { label: "watsapp", value: value[2].value, type: "" },
    { label: "facebook", value: value[3].value, type: "link" },
    { label: "instagram", value: value[4].value, type: "link" },
    { label: "linkden", value: value[5].value, type: "link" },
    { label: "tiktok", value: value[6].value, type: "link" },
  ]);

  return (
    <EditSection sectionName={"contact"}onCancel={onCancel} onSave={save}>
      <div className="editSkills conedit">
        <div className="editSkillsContainer">
          {con.map((item, index) => (
            <div style={{ display: "flex" }}>
              <span style={{ color: "black", width: "80px" }}>
                {item.label}
              </span>
              <input
                key={index}
                type="text"
                placeholder={item.label}
                value={item.value}
                onChange={(e: any) => {
                  const newItem: contact = {
                    ...item,
                  };
                  newItem.value = e.target.value;
                  const list = con;
                  list[index] = newItem;
                  setCon(() => [...list]);
                  updateSkills(list);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </EditSection>
  );
};

export default EditContact;
