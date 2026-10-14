import "../styles/pages/applicants.css";
import { useEffect, useState } from "react";
import useGetApplicants from "../hooks/useGetApplicants";
import { useEditApplicant } from "../hooks/useEditApplicant";
import ConfirmReject from "../components/dialogs/ConfirmReject";
import { formatDistanceToNow } from "date-fns";

interface Application {
  job_id?: string;
  user_id?: string;
  _id?: string;
  employer_id?: string;
  job_title?: string;
  applicant_name?: string;
  applicant_email?: string;
  resume_link?: string;
  portfolio_link?: string;
  rejected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const Applicants = () => {
  const { data, refetch } = useGetApplicants();
  const [applications, setApplications] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState("");

  useEffect(() => {
    if (data) {
      setApplications(data);
    }
  }, [data]);

  const { postdata } = useEditApplicant();
  console.log(postdata);

  const rejectApp = async () => {
    await postdata({ rejected: true }, id);
    refetch();
  };

  return (
    <div className="applicants">
      {show ? (
        <ConfirmReject rejectApp={rejectApp} onCancel={() => setShow(false)} />
      ) : null}
      <h1>APPLICATIONS</h1>
      <div className="tabs">
        {/*         <button onClick={() => filterApplications("all")}>clear</button>
        <button onClick={() => filterApplications("rejected")}>rejected</button>
        <button onClick={() => filterApplications("open")}>open</button> */}
      </div>
      {applications?.map((app: Application, index: number) => (
        <div className="applicant-box hover-icon-parent" key={index}>
          <h1>{app.job_title!}</h1>
          <p>{app.applicant_name || app.user_id}</p>
          <p>{app.applicant_email}</p>
          {app.resume_link ? (
            <a href={app.resume_link} target="_blank">
              resume
            </a>
          ) : null}
          {app.resume_link ? (
            <a href={app.portfolio_link} target="_blank">
              portfolio
            </a>
          ) : null}
          <span>{`applied ${formatDistanceToNow(
            new Date(app.createdAt!)
          )} ago`}</span>
          <button
            onClick={() => {
              setID(app._id!);
              setShow(true);
            }}
            className="reject remove hover-icon"
          >
            reject
          </button>
        </div>
      ))}
      {applications?.length === 0 ? (
        <p>NO APPLICANTS</p>
      ) : null}
    </div>
  );
};

export default Applicants;


