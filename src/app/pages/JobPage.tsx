import { useEffect, useState } from "react";
import "../styles/pages/vacancies.css";
import ApplyNow from "../components/ApplyNow";
import { Link } from "react-router-dom";
import useGetSingleJob from "../hooks/usePublicGetJob";
import { defaultJob, Job } from "../helpers/helpers";
import { useStore } from "../store/store";

const JobPage = () => {
  const { employee } = useStore();
  const ID = employee?.user?._id;

  const [show, setShow] = useState(false);

  const { data } = useGetSingleJob();

  const [job, setJob] = useState<Job>(defaultJob);

  useEffect(() => {
    if (data) {
      setJob(data);
    }
  }, [data]);

  return (
    <div className="vacancies">
      {show ? <ApplyNow job={job} onCancel={() => setShow(false)} /> : null}
      <div className="jobpage-top">
        <Link to="/">jobs/title</Link>
        <button
          style={{
            backgroundColor: ID ? "" : "grey",
            cursor: ID ? "pointer" : "not-allowed",
          }}
          disabled={!ID}
          onClick={(e) => {
            e.stopPropagation();
            setShow(true);
          }}
        >
          apply
        </button>
      </div>
      <div className="vacancy-box-public">
        <h1>title</h1>
        <span>{job.title!}</span>
      </div>
      <div className="vacancy-box-public">
        <h1>description</h1>
        <p>{job.description!}</p>
      </div>
      <div className="vacancy-box-public">
        <h1>salary</h1>
        <p>{job.salary!}</p>
      </div>
      <div className="vacancy-box-public">
        <h1>type</h1>
        <p>{job.work_type!}</p>
      </div>
      <div className="vacancy-box-public">
        <h1>requirments</h1>
        {job?.requirements?.map((req, index) => (
          <div key={index} className="req-box">
            <p>{req!}</p>
          </div>
        ))}
      </div>
      <div className="vacancy-box-public">
        <h1>responsibilites</h1>
        {job?.responsibilities?.map((req, index) => (
          <div key={index} className="req-box">
            <p>{req!}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
