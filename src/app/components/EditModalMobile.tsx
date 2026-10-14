import { useEffect, useState } from "react";
import "../styles/components/editModalMobile.css";
import { IoIosClose } from "react-icons/io";
import EditScrollToTop from "./EditScrollToTop";
import Templates from "./Templates";
import ConfirmPublish from "./dialogs/ConfirmPublish";
import Fonts from "./Fonts";
import ConfirmReset from "./dialogs/ConfirmReset";
import { portfolio } from "../helpers/helpers";

interface TemplateProps {
  onCancel: () => void;
  setPortfolio: any;
  data: portfolio;
  pub: () => void;
  revert: () => void;
}

const EditModalMobile: React.FC<TemplateProps> = ({
  onCancel,
  data,
  setPortfolio,
  revert,
}) => {
  const [templates, setTemplates] = useState(false);
  const [fonts, setFonts] = useState(false);
  const [publish, setPublish] = useState(false);
  const [scrollComp, setScrollComp] = useState(false);
  const [reset, setReset] = useState(false);

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

  const setTemplate = (font: string) => {
    setPortfolio((prevPortfolio: any) => ({
      ...prevPortfolio,
      template: font,
    }));
  };

  const setFont = (font: string) => {
    setPortfolio((prevPortfolio: any) => ({
      ...prevPortfolio,
      font: font,
    }));
  };

  return (
    <div className="editModalMobile">
      {publish ? (
        <ConfirmPublish updateValue={() => console.log("hello")} onCancel={() => setPublish(false)} />
      ) : null}
      {scrollComp ? (
        <EditScrollToTop
          data={data}
          setPortfolio={setPortfolio}
          onCancel={() => setScrollComp(false)}
        />
      ) : null}

      {templates ? (
        <Templates
          onCancel={() => setTemplates(false)}
          updateTemplate={setTemplate}
          template={data.template!}
        />
      ) : null}
      {fonts ? (
        <Fonts
          template={data.font!}
          updateFont={setFont}
          onCancel={() => setFonts(false)}
        />
      ) : null}

      {reset ? (
        <ConfirmReset onCancel={() => setReset(false)} revert={revert} />
      ) : null}

      <div className="editModalMobileContent">
        <div className="top">
          <h1>Edit</h1>
          <IoIosClose className="close" onClick={onCancel} />
        </div>
        <div className="editModalMobileContainer">
          <div onClick={() => setTemplates(true)} className="box">
            <p>templates</p>
          </div>
          <div onClick={() => setFonts(true)} className="box">
            <p>fonts</p>
          </div>
          <div onClick={() => setScrollComp(true)} className="box">
            <p>scroll</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModalMobile;
