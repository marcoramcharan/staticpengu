import { ReactNode, useState } from "react";
import Modal from "./Modal";
import '../../styles/pages/notes.css'
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onCancel: () => void;
}

const AddNote: React.FC<TemplateProps> = ({ onCancel }) => {
  const [text, setText] = useState(``);

  const alertShit = () => {
    alert(text);
    onCancel();
  };

  return (
    <Modal title="edit note" onSave={alertShit} onCancel={onCancel}>
      <div className="add-note">
        <input
          type="text"
          placeholder="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select>
          <option value="">group1</option>
        </select>
        <textarea
          placeholder="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="error-box">
          <p>error</p>
        </div>
      </div>
    </Modal>
  );
};

export default AddNote;
