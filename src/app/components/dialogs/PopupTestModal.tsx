import { ReactNode, useState } from "react";
import Modal from "./Modal";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
}

const PopupTestModal: React.FC<TemplateProps> = ({ onCancel }) => {
  const [text, setText] = useState(``);

  const alertShit = () => {
    alert(text);
    onCancel()
  };

  return (
    <div>
      <Modal title="this is a title" onSave={alertShit} onCancel={onCancel}>
        <div>
          <input
            type="text"
            placeholder="name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default PopupTestModal;
