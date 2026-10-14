import '../styles/components/editCell.css'
import EditDetail from "./EditDetails";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
}

const EditCell: React.FC<TemplateProps> = ({ onCancel }) => {
  return (
    <EditDetail detailName={"Cell"} onCancel={onCancel} onSave={() => console.log("hllo")}>
      <div className="editCell">
        <input type="text" placeholder="Cell" />
      </div>
    </EditDetail>
  );
};

export default EditCell;
