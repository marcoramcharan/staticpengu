import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editBanner.css";
import { MdEdit } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useRef, useState } from "react";
import { portfolio } from "../helpers/helpers";
interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  data: portfolio;
  updateSkills: (font: any) => void;
}

const EditBanner: React.FC<TemplateProps> = ({
  onCancel,
  data,
  updateSkills,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>(data.photo2 || null);
  const photo = data.photo

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [name, setName] = useState(data.name);
  const [surname, setSurname] = useState(data.surname);
  const [occupation, setOccupation] = useState(data.occupation);

  const save = () => {
    updateSkills({
      name,
      surname,
      occupation,
      photo: photo,
      photo2: selectedImage,
      photoChange: true,
    });
    onCancel();
  };

  return (
    <EditSection sectionName={"banner"} onCancel={onCancel} onSave={save}>
      <div className="editBanner">
        {data.template !== `TWO` ? null : (
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
              onClick={() => {setSelectedImage(null)}}
              className="photo-cancel-button"
            />
          </div>
        )}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="surname"
        />
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="occupation"
        />
      </div>
    </EditSection>
  );
};

export default EditBanner;
