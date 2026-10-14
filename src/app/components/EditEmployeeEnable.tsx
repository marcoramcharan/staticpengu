import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editAbout.css";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  updateData: (attr: string, value: any) => void;
}

const EditEmployeeEnable: React.FC<TemplateProps> = ({
  onCancel,
  updateData,
}) => {
  const save = () => {
    updateData("active", true);
    onCancel();
  };

  return (
    <EditSection sectionName={"enable"} onCancel={onCancel} onSave={save}>
      <div className="editAbout">
        <p>are you sure you want to enable</p>
      </div>
    </EditSection>
  );
};

export default EditEmployeeEnable;
