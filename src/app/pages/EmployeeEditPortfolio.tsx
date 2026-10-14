import { MdArrowDownward, MdArrowUpward, MdEdit } from "react-icons/md";
import "../styles/pages/vacancies.css";
import { useEffect, useState } from "react";
import EditEmployeeName from "../components/EditEmployeeName";
import EditEmployeeSurname from "../components/EditEmployeeSurname";
import EditEmployeeAge from "../components/EditEmployeeAge";
import EditEmployeeOccupation from "../components/EditEmployeeOccupation";
import EditEmployeeSkills from "../components/EditEmployeeSkills";
import EditEmployeeWebsite from "../components/EditEmployeeWebsite";
import {
  defaultEmployeePortfolio,
  EmployeePortfolio,
} from "../helpers/helpers";
import { Link } from "react-router-dom";
import EditEmployeeAbout from "../components/EditEmployeeAbout";
import useGetEmployeePortfolio from "../hooks/useGetEmployeePortfolio";
import { useStore } from "../store/store";
import { api } from "../api/api";
import { useEditPortfolioEmployee } from "../hooks/useEditPortfolioEmployee";
import EditEmployeeDisable from "../components/EditEmployeeDisable";
import EditEmployeeEnable from "../components/EditEmployeeEnable";
import EmptyFieldWarning from "../components/EmptyFieldWarning";
import FieldInfo from "../components/FieldInfo";

const EmployeeEditPortfolio = () => {
  const { employee } = useStore();

  const [showName, setShowName] = useState(false);
  const [showSurname, setShowSurname] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showOccupation, setShowOccupation] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showUnpublish, setShowUnpublish] = useState(false);

  const { data, refetch } = useGetEmployeePortfolio(
    `${api}/api/employee/portfolio`,
    employee.token
  );

  const { postdata } = useEditPortfolioEmployee();

  const [portfolio, setPortfolio] = useState<EmployeePortfolio>(
    defaultEmployeePortfolio
  );
  const [portfolio2, setPortfolio2] = useState<EmployeePortfolio>(
    defaultEmployeePortfolio
  );

  useEffect(() => {
    if (data) {
      setPortfolio(data);
      setPortfolio2(data);
    }
  }, [data]);

  console.log(portfolio, portfolio2, refetch);

  // add in edit the edit employee
  const updateData = async (attr: string, value: any) => {
    console.log("att and value", attr, value);
    await postdata({ ...portfolio, [attr]: value });
    refetch();
  };
  return (
    <div className="vacancies">
      {showName ? (
        <EditEmployeeName
          updateData={updateData}
          value={data.name!}
          onCancel={() => setShowName(false)}
        />
      ) : null}
      {showSurname ? (
        <EditEmployeeSurname
          updateData={updateData}
          value={data.surname!}
          onCancel={() => setShowSurname(false)}
        />
      ) : null}
      {showAge ? (
        <EditEmployeeAge
          updateData={updateData}
          value={data.age!}
          onCancel={() => setShowAge(false)}
        />
      ) : null}
      {showAbout ? (
        <EditEmployeeAbout
          updateData={updateData}
          value={data.about!}
          onCancel={() => setShowAbout(false)}
        />
      ) : null}
      {showOccupation ? (
        <EditEmployeeOccupation
          updateData={updateData}
          value={data.occupation!}
          onCancel={() => setShowOccupation(false)}
        />
      ) : null}
      {showSkills ? (
        <EditEmployeeSkills
          updateData={updateData}
          value={data.skills!}
          onCancel={() => setShowSkills(false)}
        />
      ) : null}
      {showWebsite ? (
        <EditEmployeeWebsite
          updateData={updateData}
          value={data.website!}
          onCancel={() => setShowWebsite(false)}
        />
      ) : null}
      {showPublish ? (
        <EditEmployeeEnable
          updateData={updateData}
          onCancel={() => setShowPublish(false)}
        />
      ) : null}
      {showUnpublish ? (
        <EditEmployeeDisable
          updateData={updateData}
          onCancel={() => setShowUnpublish(false)}
        />
      ) : null}
      <div className="employerEditPortfolioTop">
        <h1>PORTFOLIO</h1>
        <Link to={`/profile/employee/${employee.user._id}`}>
          view portfolio
        </Link>
      </div>{" "}
      <div
        className="port-box hover-icon-parent"
        onClick={() => setShowName(true)}
      >
        <div>
          <h1>name</h1>
          <FieldInfo attribute="your first name"/>
          {portfolio.name ? (
            portfolio.name
          ) : (
            <EmptyFieldWarning attribute="name" />
          )}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        className="port-box hover-icon-parent"
        onClick={() => setShowSurname(true)}
      >
        <div>
          <h1>surname</h1>
          <FieldInfo attribute="your last name"/>
          {portfolio.surname ? (
            portfolio.surname
          ) : (
            <EmptyFieldWarning attribute="surname" />
          )}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowAge(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>age</h1>
          <FieldInfo attribute="how old are you"/>
          {portfolio.age ? (
            portfolio.age
          ) : (
            <EmptyFieldWarning attribute="age" />
          )}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        onClick={() => setShowOccupation(true)}
        className="port-box hover-icon-parent"
      >
        <div>
          <h1>occupation</h1>
          <FieldInfo attribute="what do you do"/>

          {portfolio.occupation ? (
            portfolio.occupation
          ) : (
            <EmptyFieldWarning attribute="occupation" />
          )}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        className="port-box hover-icon-parent"
        onClick={() => setShowAbout(true)}
      >
        <div>
          <h1>about</h1>
          <FieldInfo attribute="tell us about yourself"/>
          {portfolio.about ? (
            portfolio.about
          ) : (
            <EmptyFieldWarning attribute="about" />
          )}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        className="port-box hover-icon-parent"
        onClick={() => setShowSkills(true)}
      >
        <div>
          <h1>skills</h1>
          <FieldInfo attribute="what you use to accomplish tasks"/>
          <span>
            {portfolio.skills?.length! > 0 ? (
              portfolio.skills?.slice(0, 3).join(", ")
            ) : (
              <EmptyFieldWarning attribute="skills" />
            )}
          </span>{" "}
        </div>
        <MdEdit className="hover-icon" />
      </div>
      <div
        className="port-box hover-icon-parent"
        onClick={() => setShowWebsite(true)}
      >
        <div>
          <h1>website</h1>
          <FieldInfo attribute="your web footprint"/>
          {portfolio.website ? (
            portfolio.website
          ) : (
            <EmptyFieldWarning attribute="website" />
          )}
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
            <span>portfolio is available to employers</span>
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
            <span>portfolio is not avilable to employers</span>
          </div>
          <MdArrowUpward className="hover-icon" />
        </div>
      )}
    </div>
  );
};

export default EmployeeEditPortfolio;
