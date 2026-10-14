import { ReactNode } from "react";
import "../../styles/components/modal.css";
interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  onSave: () => void;
  onCancel: () => void;
}

const Modal: React.FC<TemplateProps> = ({
  title,
  children,
  onCancel,
  onSave,
}) => {
  return (
    <div className={`modal ${title}`}>
      <div className="content">
        <div className="top">
          <h1>title</h1>
        </div>
        {children}
        <div className="bottom">
          <button onClick={onCancel}>cancel</button>
          <button onClick={onSave}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
