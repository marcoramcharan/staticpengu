import { ReactNode, useEffect } from "react";
import "../../styles/components/dialog.css";

interface TemplateProps {
  title?: string;
  buttonTxt?: string;
  executeNext?: boolean;
  disable?: boolean;
  children?: ReactNode | undefined;
  onSave?: (data: any) => void;
  onCancel?: () => void;
  next?: () => void;
}

const Dialog: React.FC<TemplateProps> = ({
  title,
  children,
  buttonTxt,
  onCancel,
  onSave,
  next,
  executeNext,
  disable,
}) => {
  useEffect(() => {
    // Set the body height and overflow when the component mounts
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    // Cleanup function to reset the body overflow when the component unmounts
    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={`dialog`}>
      <div className="content">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="center">{children}</div>
        <div className="bottom">
          <button onClick={onCancel}>cancel</button>
          {executeNext && !disable ? (
            <button onClick={next}>next</button>
          ) : !executeNext && !disable ? (
            <button onClick={onSave}>{buttonTxt ?? `save`}</button>
          ) : (
            <button
              style={{
                backgroundColor: "grey",
                cursor: "not-allowed",
              }}
              onClick={onSave}
            >
              {buttonTxt ?? `save`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
