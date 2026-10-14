import "../styles/components/editSection.css";
import EditSection from "./EditSection";
import "../styles/components/editBanner.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import useGetResume from "../hooks/useGetResume";
import { useEditPortfolioPhotoEmployee } from "../hooks/useEditPortfolioPhotoEmployee";
import { useEditResume } from "../hooks/useEditResume";
interface TemplateProps {
  onCancel: () => void;
  ref2: () => void;
  sectionName?: string;
}

export interface Resume {
  photo?: string;
  photo2?: string;
  user_id: string;
  deleted?: boolean;
  mimetype?: string;
  filename?: string;
}

const defaultResume: Resume = {
  photo: "",
  photo2: "",
  user_id: "",
  deleted: false,
  mimetype: "",
  filename: "",
};

const EditEmployeePhoto: React.FC<TemplateProps> = ({ onCancel, ref2 }) => {
  const { postdata2 } = useEditPortfolioPhotoEmployee();
  const { postdata: postdata3 } = useEditResume();

  const { data: data2, refetch } = useGetResume();

  const [data, setData] = useState<Resume>(defaultResume);
  const [delete2, setDelete2] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>(data.photo2 || null);
  const photo = data.photo;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const save = async () => {
    console.log("photo", photo);
    console.log("selectedImage", selectedImage);
    if (delete2) {
      await postdata3({ photo: "" });
      ref2();
      onCancel();
      return;
    }
    await updatePhoto(selectedImage);
    ref2();
    onCancel();
  };

  useEffect(() => {
    if (data2) {
      setData(data2);
    }
  }, [data]);

  const updatePhoto = async (photo: string) => {
    await postdata2(photo);
    refetch();
    ref2();
  };

  return (
    <EditSection sectionName={"resume"} onCancel={onCancel} onSave={save}>
      <div className="editBanner">
        <span style={{ fontSize: "15px" }}>
          {delete2 ? (
            "no resume"
          ) : selectedImage ? (
            <span>{selectedImage ? selectedImage.name : null}</span>
          ) : (
            <span>{data2?.photo ? data2.filename : "no resume"}</span>
          )}
        </span>
        <div className="resume-menu">
          <MdEdit onClick={handleButtonClick} className="photo-edit-button" />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e: any) => {
              setSelectedImage(e.target.files[0]);
              setDelete2(false);
              console.log("aded", e.target.files[0]);
            }}
          />
          <GrPowerReset
            onClick={() => {
              setSelectedImage(null);
              setDelete2(false);
            }}
            className="photo-cancel-button"
          />
          <MdDelete onClick={() => setDelete2(true)} />
        </div>
      </div>
    </EditSection>
  );
};

export default EditEmployeePhoto;
