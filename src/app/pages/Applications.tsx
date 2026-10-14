import { IoMdRemove } from "react-icons/io";
import "../styles/pages/applications.css";
import { useEffect, useState } from "react";
import ConfirmRemove from "../components/dialogs/ConfirmRemove";
import useGetApplications from "../hooks/useGetApplications";
import { formatDistanceToNow } from "date-fns";
import { useDeleteApplication } from "../hooks/useDeleteApplication";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams

const Applications = () => {
  const { data, refetch } = useGetApplications();
  const [applications, setApplications] = useState<any>([]);
  const [filteredApplications, setFilteredApplications] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState("");
  const [filter, setFilter] = useState("all");
  console.log(filter);

  const [searchParams] = useSearchParams(); // Get the search params

  useEffect(() => {
    if (data) {
      setApplications(data);
      setFilteredApplications(data); // Initially show all applications
    }

    // Check if the query param 'open' is true
    const openParam = searchParams.get("open");
    if (openParam === "true") {
      setFilter("open");
      filterApplications("open"); // Apply the filter
    }
  }, [data, searchParams]);

  const filterApplications = (filterType: string) => {
    setFilter(filterType);
    if (filterType === "all") {
      setFilteredApplications(applications);
    } else if (filterType === "rejected") {
      setFilteredApplications(applications.filter((app: any) => app.rejected));
    } else if (filterType === "open") {
      setFilteredApplications(applications.filter((app: any) => !app.rejected));
    }
  };

  const { deleteApp } = useDeleteApplication();

  const deleteApplication = async () => {
    await deleteApp(id);
    refetch();
  };

  return (
    <div className="applications">
      {show ? (
        <ConfirmRemove
          deleteApp={deleteApplication}
          onCancel={() => setShow(false)}
        />
      ) : null}
      <h1>APPLICATIONS</h1>
      <div className="tabs">
        <button onClick={() => filterApplications("all")}>clear</button>
        <button onClick={() => filterApplications("rejected")}>rejected</button>
        <button onClick={() => filterApplications("open")}>open</button>
      </div>
      {filteredApplications?.map((app: any, index: number) => (
        <div className="application-box hover-icon-parent" key={index}>
          <IoMdRemove
            onClick={() => {
              setShow(true);
              setID(app._id);
            }}
            className="remove hover-icon"
          />
          <h1>{app.job_title!}</h1>
          <span>{`Posted ${formatDistanceToNow(
            new Date(app.createdAt!)
          )} ago`}</span>
          <span>status: {app.rejected ? "rejected" : "open"}</span>
        </div>
      ))}
      {filteredApplications?.length! === 0 ? <p>NO APPLICATIONS</p> : null}
    </div>
  );
};

export default Applications;
