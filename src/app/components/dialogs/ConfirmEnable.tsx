import { ReactNode } from "react";
import Dialog from "./Dialog";
import { usePostData } from "../../hooks/usePostData";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
  refetch: () => void;
}

const ConfirmEnable: React.FC<TemplateProps> = ({ refetch, onCancel }) => {
  const { postdata } = usePostData();
  const alertShit = async () => {
    await postdata({ active: true });
    refetch();
    onCancel();
  };

  return (
    <div>
      <Dialog title="this is a title" onSave={alertShit} onCancel={onCancel}>
        <div>
          <p>are u sure u want to enable</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmEnable;
