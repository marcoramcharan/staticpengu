import { MdEdit } from "react-icons/md";
import "../styles/components/editName.css";
import EditDetail from "./EditDetails";
import { GrPowerReset } from "react-icons/gr";
import { ChangeEvent, useRef, useState } from "react";

interface portfolio {
  template: string;
  name: string;
  surname: string;
  about: string;
  skills: string[];
  hobbies: string[];
  softSkills: string[];
  we: string[];
  edu: string[];
  email: string;
  occupation: string;
  links: any;
  footer: string;
  navbar: string;
  scroll: boolean;
  font: string;
  cell: string;
  photo: string;
}

interface TemplateProps {
  onCancel: () => void;
  sectionName?: string;
  data: portfolio;
  updatePhoto: (font: any) => void;
}

const EditPhoto: React.FC<TemplateProps> = ({
  onCancel,
  data,
  updatePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(data.photo);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file");
    }
  };

  const save = () => {
    updatePhoto(selectedImage);
    onCancel();
  };

  return (
    <EditDetail detailName={"photo"} onCancel={onCancel} onSave={save}>
      <div className="editName">
        {data.template !== `TWO` ? null : (
          <div className="photo">
            {/*             {selectedImage ? (
              <img src={selectedImage as string} alt="" />
            ) : (
              <img src={img} alt="" />
            )} */}
            <img src={selectedImage as string} alt="" />
            <MdEdit onClick={handleButtonClick} className="photo-edit-button" />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />
            <GrPowerReset
              onClick={() => setSelectedImage(data.photo)}
              className="photo-cancel-button"
            />
          </div>
        )}{" "}
      </div>
    </EditDetail>
  );
};

export default EditPhoto;
