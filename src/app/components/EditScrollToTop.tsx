import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editScrollToTop.css";
import { useState } from "react";
import { portfolio } from "../helpers/helpers";

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  data: portfolio;
  setPortfolio: any;
}

const EditScrollToTop: React.FC<TemplateProps> = ({
  onCancel,
  data,
  setPortfolio,
}) => {
  const [value, setValue] = useState(data.scroll);

  const save = () => {
    setPortfolio((prevPortfolio: any) => ({
      ...prevPortfolio,
      scroll: value,
    }));
    onCancel();
  };

  return (
    <EditSection sectionName={"scrolltotop"} onCancel={onCancel} onSave={save}>
      <div className="editScrollToTop">
        <p>{value ? `Enabled` : `Disabled`}</p>
        <button onClick={() => setValue(!value)}>
          {value ? `Disable` : `Enable`}
        </button>
      </div>
    </EditSection>
  );
};

export default EditScrollToTop;
