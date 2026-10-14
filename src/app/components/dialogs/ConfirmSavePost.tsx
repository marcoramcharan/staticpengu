import { ReactNode } from "react";
import Dialog from "./Dialog";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  savePost: () => void;
}

const ConfirmSavePost: React.FC<TemplateProps> = ({ onCancel, savePost }) => {
  const save = () => {
    savePost();
    onCancel();
  };

  return (
    <div>
      <Dialog title="this is a title" onSave={save} onCancel={() => onCancel()}>
        <div>
          <p>are u sure u want to save and post</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmSavePost;
