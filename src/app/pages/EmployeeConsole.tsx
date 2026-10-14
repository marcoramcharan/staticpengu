import { useNavigate } from "react-router-dom";
import "../styles/pages/console.css";
import { useState } from "react";
import useGetEmployeeStatus from "../hooks/useGetEmployeeStatus";
import EditEmployeePhoto from "../components/EditEmployeePhoto";
import useGetResume from "../hooks/useGetResume";

const EmployeeConsole = () => {
  const { data, refetch: refetch2 } = useGetEmployeeStatus();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { data: data2, refetch } = useGetResume();

  const ref2 = () => {
    refetch();
    refetch2();
  };

  return (
    <div className="console">
      {/*       {show ? <EditCv onCancel={() => setShow(false)} /> : null}
       */}

      {show ? <EditEmployeePhoto ref2={ref2} onCancel={() => setShow(false)} /> : null}
      <div onClick={() => setShow(true)} className="console-box">
        <p>resume</p>
        <span>{data2?.photo ? "uploaded" : "no resume"}</span>
      </div>
      <div
        onClick={() => navigate(`/employee/console/egergrewg/portfolio`)}
        className="console-box"
      >
        <p>portfolio</p>
        <span>{data?.portfolioPercentageComplete}% complete</span>
      </div>
      <div
        onClick={() => navigate(`/employee/console/egergrewg/applications`)}
        className="console-box"
      >
        <p>applications</p>
        <span>{data?.applicantsCount}</span>
      </div>
    </div>
  );
};

export default EmployeeConsole;
