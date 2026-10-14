import { ReactNode } from "react";
import Dialog from "./Dialog";
import { usePostData } from "../../hooks/usePostData";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  refetch: () => void;
}

const ConfirmDisable: React.FC<TemplateProps> = ({ onCancel, refetch }) => {
  const { postdata } = usePostData();
  const alertShit = async () => {
    await postdata({ active: false });
    refetch();
    onCancel();
  };

  return (
    <div>
      <Dialog title="this is a title" onSave={alertShit} onCancel={onCancel}>
        <div>
          <p>are u sure u want to disable</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmDisable;
