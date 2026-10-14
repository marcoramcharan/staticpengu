import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  value: boolean;
  updateValue: (attr: string, value: any) => void;
}

const EditJobStatus: React.FC<TemplateProps> = ({
  onCancel,
  value,
  updateValue,
}) => {
  const save = () => {
    updateValue("active", !value);
    onCancel();
  };

  return (
    <EditSection sectionName={"status"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        {value ? <p>make false</p> : <p>make active</p>}
      </div>
    </EditSection>
  );
};

export default EditJobStatus;
