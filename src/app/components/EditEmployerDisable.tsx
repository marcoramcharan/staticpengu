import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  updateData: (attr: string, value: any) => void;
}

const EditEmployerDisable: React.FC<TemplateProps> = ({
  onCancel,
  updateData,
}) => {
  const save = () => {
    updateData("active", false);
    onCancel();
  };

  return (
    <EditSection sectionName={"disable"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <p>are you sure you want to disable</p>
      </div>
    </EditSection>
  );
};

export default EditEmployerDisable;
