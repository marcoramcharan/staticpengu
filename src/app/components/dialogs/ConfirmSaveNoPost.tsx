import Dialog from "./Dialog";
interface TemplateProps {
  onCancel: () => void;
  saveNoPost: () => void;
}

const ConfirmSaveNoPost: React.FC<TemplateProps> = ({ onCancel, saveNoPost }) => {

  const save = () => {
    saveNoPost();
    onCancel();
  };

  return (
    <div>
      <Dialog title="this is a title" onSave={save} onCancel={() => onCancel()}>
        <div>
          <p>are u sure u want to save without posting</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmSaveNoPost;
