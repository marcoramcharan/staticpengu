import { ReactNode } from "react";
import "../styles/section.css";
import { MdEdit } from "react-icons/md";

interface TemplateProps {
  title?: string;
  children?: ReactNode | undefined;
  id?: string;
  show?: boolean;
  label?: boolean;
  mode: boolean;
  name: string;
  is_hidden: boolean;
  type: string;
  theme: string;
  onClick?: () => void;
}

const Section: React.FC<TemplateProps> = ({
  id,
  mode,
  children,
  name,
  is_hidden,
  type,
  label,
  theme,
  onClick,
}) => {
  console.log(id, mode, children, name, is_hidden, type, label, theme);

  return (
    <div className="section">
      {mode ? (
        <div className="section-settings">
          <p>{name}</p>
            <MdEdit
              onClick={() => (onClick ? onClick() : console.log(`nothing`))}/>
        </div>
      ) : null}

      {mode ? (
        <div className="section-main-border">
          <div>{children}</div>
        </div>
      ) : (
        <div className="section-main">
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Section;
