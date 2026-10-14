import "../styles/pages/employerPortfolio.css";
import { MdCall, MdOutlineMail } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import useGetEmployeePublicPortfolio from "../hooks/useGetEmployeePublicPortfolio";
import {
  defaultEmployeePortfolio,
  EmployeePortfolio,
} from "../helpers/helpers";

const EmployeePublicPortfolio = () => {
  const { data } = useGetEmployeePublicPortfolio();

  const [job, setJob] = useState<EmployeePortfolio>(defaultEmployeePortfolio);

  useEffect(() => {
    if (data) {
      setJob(data);
    }
  }, [data]);

  return (
    <div className="employerPublicPortfolio">
      <div className="employerPublicPortfolioContent">
        {job.name || job.surname ? (
          <div className="vacancy-box-public">
            <h1>name</h1>
            <p>
              {job.name!} {job.surname!}
            </p>
          </div>
        ) : null}

        {job.occupation ? (
          <div className="vacancy-box-public">
            <h1>occupation</h1>
            <p>{job.occupation!}</p>
          </div>
        ) : null}

        {job.age ? (
          <div className="vacancy-box-public">
            <h1>age</h1>
            <p>{job.age!}</p>
          </div>
        ) : null}

        {job.about ? (
          <div className="vacancy-box-public">
            <h1>about me</h1>
            <p>{job.about!}</p>
          </div>
        ) : null}

        {job.skills?.length! > 0 ? (
          <div className="vacancy-box-public">
            <h1>my skills</h1>
            {job?.skills?.map((skill) => (
              <p>{skill}</p>
            ))}
          </div>
        ) : null}

        {job.website ? (
          <div className="vacancy-box-public">
            <IoEarthOutline />
            <p>{job.website!}</p>
          </div>
        ) : null}

        {job.contact_no ? (
          <div className="vacancy-box-public">
            <MdCall />
            <p>{job.contact_no!}</p>
          </div>
        ) : null}

        {job.email ? (
          <div className="vacancy-box-public">
            <MdOutlineMail />
            <p>{job.email!}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmployeePublicPortfolio;
