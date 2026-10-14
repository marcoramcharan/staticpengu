import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editBanner.css";
import { MdEdit } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useRef, useState } from "react";
import useGetResume from "../hooks/useGetResume";
import { useEditPortfolioPhotoEmployee } from "../hooks/useEditPortfolioPhotoEmployee";
interface TemplateProps {
  onCancel: () => void;
}

const EditResume: React.FC<TemplateProps> = ({ onCancel }) => {
  const { data: data2 } = useGetResume();

  const data = data2;

  const { postdata2 } = useEditPortfolioPhotoEmployee();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>(data.photo2 || null);
  const photo = data.photo;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const save = async () => {
    await postdata2(selectedImage);
    onCancel();
  };

  return (
    <EditSection onSave={save} sectionName={"photo"} onCancel={onCancel}>
      <div className="editBanner">
        <div className="photo">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : photo}
            alt=""
          />
          <MdEdit onClick={handleButtonClick} className="photo-edit-button" />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e: any) => setSelectedImage(e.target.files[0])}
          />
          <GrPowerReset
            onClick={() => {
              setSelectedImage(null);
            }}
            className="photo-cancel-button"
          />
        </div>
      </div>
    </EditSection>
  );
};

export default EditResume;
