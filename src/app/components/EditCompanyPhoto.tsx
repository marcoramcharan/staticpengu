import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editBanner.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useRef, useState } from "react";
import { EmployerPortfolio } from "../helpers/helpers";
interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  data: EmployerPortfolio;
  updatePhoto: (font: any) => void;
  updateData: (attr: string, value: any) => void;
}

const EditCompanyPhoto: React.FC<TemplateProps> = ({
  onCancel,
  data,
  updatePhoto,
  updateData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>(data.photo2 || null);
  const photo = data.photo;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const save = () => {
    updatePhoto(selectedImage);
    onCancel();
  };

  const deleteResume = async () => {
    updateData("photo", "");
    onCancel();
  };

  return (
    <EditSection sectionName={"photo"} onCancel={onCancel} onSave={save}>
      <div className="editBanner">
        <div className="photo">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : photo}
            alt=""
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e: any) => setSelectedImage(e.target.files[0])}
          />
        </div>
        <div className="photo-menu">
          <MdEdit onClick={handleButtonClick} className="photo-edit-button" />

          <GrPowerReset
            onClick={() => {
              setSelectedImage(null);
            }}
            className="photo-cancel-button"
          />
          <MdDelete onClick={deleteResume}/>
        </div>
      </div>
    </EditSection>
  );
};

export default EditCompanyPhoto;
