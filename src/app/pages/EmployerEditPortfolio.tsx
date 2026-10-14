import { MdArrowDownward, MdArrowUpward, MdEdit } from "react-icons/md";
import "../styles/pages/vacancies.css";
import "../styles/pages/employerEditPortfolio.css";
import { useEffect, useState } from "react";
import EditCompanyPhoto from "../components/EditCompanyPhoto";
import EditCompanyName from "../components/EditCompanyName";
import EditCompanyWorkForce from "../components/EditCompanyWorkForce";
import EditCompanyWebsite from "../components/EditCompanyWebsite";
import EditCompanyHR from "../components/EditCompanyHR";
import { Link } from "react-router-dom";
import useGetEmployerPortfolio from "../hooks/useGetEmployerPortfolio";
import { api } from "../api/api";
import { useStore } from "../store/store";
import {
  defaultEmployerPortfolio,
  EmployerPortfolio,
} from "../helpers/helpers";
import { useEditPortfolioEmployer } from "../hooks/useEditPortfolioEmployer";
import { useEditPortfolioPhotoEmployer } from "../hooks/useEditPortfolioPhotoEmployer";
import EditEmployeeEnable from "../components/EditEmployeeEnable";
import EditEmployeeDisable from "../components/EditEmployeeDisable";
import EditCompanyContactNos from "../components/EditCompanyContactNos";
import { CiRead } from "react-icons/ci";
import EmptyFieldWarning from "../components/EmptyFieldWarning";
import EditCompanyLocation from "../components/EditCompanyLocation";
import LocationDisplay from "../components/LocationDisplay";
import FieldInfo from "../components/FieldInfo";

const EmployerEditPortfolio = () => {
  const { employer } = useStore();

  const [showPhoto, setShowPhoto] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showWorkForce, setShowWorkForce] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showHREmails, setShowHREmails] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const [showPublish, setShowPublish] = useState(false);
  const [showUnpublish, setShowUnpublish] = useState(false);

  const { data, refetch } = useGetEmployerPortfolio(
    `${api}/api/employer/portfolio`,
    employer.token
  );

  const { postdata } = useEditPortfolioEmployer();
  const { postdata2 } = useEditPortfolioPhotoEmployer();

  const [portfolio, setPortfolio] = useState<EmployerPortfolio>(
    defaultEmployerPortfolio
  );

  useEffect(() => {
    if (data) {
      setPortfolio(data);
    }
  }, [data]);

  console.log("portoflio", portfolio, refetch);

  // add in edit the edit employee
  const updateValue = async (attr: string, value: any) => {
    await postdata({ ...portfolio, [attr]: value });
    refetch();
  };

  const updateLocationValue = async (location: any, locationHierarchy: any) => {
    await postdata({
      ...portfolio,
      ["location"]: location,
      ["locationHierarchy"]: locationHierarchy,
    });
    refetch();
  };

  // add in edit the edit employee
  const updatePhoto = async (photo: string) => {
    console.log("upload pgot here");
    await postdata2(photo);
    refetch();
  };

  return (
    <div className="vacancies">
      {showPhoto ? (
        <EditCompanyPhoto
          updatePhoto={updatePhoto}
          updateData={updateValue}
          data={portfolio!}
          onCancel={() => setShowPhoto(false)}
        />
      ) : null}
      {showName ? (
        <EditCompanyName
          updateData={updateValue}
          value={portfolio.name!}
          onCancel={() => setShowName(false)}
        />
      ) : null}
      {showLocation ? (
        <EditCompanyLocation
        updateLocationData={updateLocationValue}
          value={portfolio.locationHierarchy!}
          onCancel={() => setShowLocation(false)}
        />
      ) : null}
      {showWorkForce ? (
        <EditCompanyWorkForce
          updateData={updateValue}
          value={portfolio.work_force!}
          onCancel={() => setShowWorkForce(false)}
        />
      ) : null}
      {showWebsite ? (
        <EditCompanyWebsite
          updateData={updateValue}
          value={portfolio.website!}
          onCancel={() => setShowWebsite(false)}
        />
      ) : null}
      {showHREmails ? (
        <EditCompanyHR
          updateData={updateValue}
          value={portfolio.hr_emails!}
          onCancel={() => setShowHREmails(false)}
        />
      ) : null}

      {showContactInfo ? (
        <EditCompanyContactNos
          updateData={updateValue}
          value={portfolio.contact_no!}
          onCancel={() => setShowContactInfo(false)}
        />
      ) : null}

      {showPublish ? (
        <EditEmployeeEnable
          updateData={updateValue}
          onCancel={() => setShowPublish(false)}
        />
      ) : null}
      {showUnpublish ? (
        <EditEmployeeDisable
          updateData={updateValue}
          onCancel={() => setShowUnpublish(false)}
        />
      ) : null}

      <div className="employerEditPortfolioTop">
        <h1>INFORMATION</h1>
        <Link to={`/profile/employer/${employer.user._id}`}>view profile</Link>
      </div>
      <div
        onClick={() => setShowPhoto(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>photo</h1>
          <FieldInfo attribute="company photo"/>
          {portfolio.photo ? (
            <div className="portbox-photo">
              <img src={portfolio.photo!} alt="" />
            </div>
          ) : (
            <EmptyFieldWarning attribute="photo" />
          )}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div className="port-box hover-icon-parent">
        <div>
          <h1>company name</h1>
          <FieldInfo attribute="name of organization"/>
          <span>
            {portfolio.name ? (
              portfolio.name
            ) : (
              <EmptyFieldWarning attribute="name" />
            )}
          </span>
        </div>
        <CiRead className="hover-icon" />
      </div>
      <div
        onClick={() => setShowLocation(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>company location</h1>
          <FieldInfo attribute="where are you located"/>
          <span>
          {portfolio.location ? (
              <LocationDisplay locationHierarchy={portfolio.locationHierarchy!} />
            ) : (
              <EmptyFieldWarning attribute="location" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowWorkForce(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>company work force</h1>
          <FieldInfo attribute="how many people work for you"/>
          <span>
            {portfolio.work_force ? (
              portfolio.work_force
            ) : (
              <EmptyFieldWarning attribute="work force" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowWebsite(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>website</h1>
          <FieldInfo attribute="companys website"/>
          <span>
            {portfolio.website ? (
              portfolio.website
            ) : (
              <EmptyFieldWarning attribute="website" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowHREmails(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>hr emails</h1>
          <FieldInfo attribute="all your hr emails"/>
          <span>
            {portfolio.hr_emails?.length! > 0 ? (
              portfolio.hr_emails?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="hr emails" />
            )}
          </span>{" "}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowContactInfo(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>contact numbers</h1>
          <FieldInfo attribute="all your contact numbers"/>
          <span>
            {portfolio.contact_no?.length! > 0 ? (
              portfolio.contact_no?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="contact_no" />
            )}
          </span>
        </div>
        <MdEdit className="hover-icon" />
      </div>

      {portfolio.active ? (
        <div
          onClick={() => setShowUnpublish(true)}
          className="port-box hover-icon-parent"
        >
          <div>
            <h1>enabled</h1>
            <span>portfolio is available</span>
          </div>
          <MdArrowDownward className="hover-icon" />
        </div>
      ) : (
        <div
          onClick={() => setShowPublish(true)}
          className="port-box hover-icon-parent"
        >
          <div>
            <h1>disabled</h1>
            <span>portfolio is not avilable</span>
          </div>
          <MdArrowUpward className="hover-icon" />
        </div>
      )}
    </div>
  );
};

export default EmployerEditPortfolio;
