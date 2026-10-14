import { CiImageOn } from "react-icons/ci";
import "../styles/pages/employerPortfolio.css";
import { MdCall, MdLocationOn, MdOutlineMail } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
import { FaComments, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddReview from "../components/AddReview";
import {
  defaultEmployerPortfolio,
  EmployerPortfolio,
} from "../helpers/helpers";
import useGetEmployerPublicPortfolio from "../hooks/useGetEmployerPublicPortfolio";
import useGetEmployerReviews from "../hooks/useGetEmployerReviews";
import { formatDistanceToNow } from "date-fns";
import LocationDisplay from "../components/LocationDisplay";

const EmployerPublicPortfolio = () => {
  const { data } = useGetEmployerPublicPortfolio();
  const { data: data2, refetch } = useGetEmployerReviews();

  const [job, setJob] = useState<EmployerPortfolio>(defaultEmployerPortfolio);
  const [job2, setJob2] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setJob(data);
    }
    if (data2) {
      setJob2(data2);
    }
  }, [data, data2]);

  const [add, setAdd] = useState(false);

  return (
    <div className="employerPublicPortfolio">
      {add ? (
        <AddReview refetch={refetch} onCancel={() => setAdd(false)} />
      ) : null}

      {job.photo ? (
        <div className="profile-photo">
          {job.photo ? <img src={job.photo} alt="" /> : <CiImageOn />}
        </div>
      ) : null}

      <div className="employerPublicPortfolioContent">
        {job.name ? (
          <div className="vacancy-box-public">
            <h1>name</h1>
            <p>{job.name!}</p>
          </div>
        ) : null}

        {job.about ? (
          <div className="vacancy-box-public">
            <h1>about</h1>
            <p>{job.about!}</p>
          </div>
        ) : null}

        {job.work_force ? (
          <div className="vacancy-box-public">
            <h1>employees</h1>
            <p>{job.work_force!}</p>
          </div>
        ) : null}

        {job.location ? (
          <div className="vacancy-box-public">
            <h1>
              {" "}
              <MdLocationOn />
            </h1>
            <LocationDisplay locationHierarchy={job.locationHierarchy!} />
          </div>
        ) : null}

        {job.website ? (
          <div className="vacancy-box-public">
            <h1>
              <IoEarthOutline />
            </h1>
            <p>{job.website!}</p>
          </div>
        ) : null}

        {job.contact_no?.length! > 0 ? (
          <div className="vacancy-box-public">
            <h1>
              <MdCall />
            </h1>
            {job.contact_no?.map((email: string) => (
              <p>{email}</p>
            ))}
          </div>
        ) : null}

        {job.hr_emails?.length! > 0 ? (
          <div className="vacancy-box-public">
            <h1>
              <MdOutlineMail /> hr
            </h1>

            {job.hr_emails?.map((email: string) => (
              <p>{email}</p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="reviews">
        <div className="reviews-top">
          <h1>
            <FaComments />
            reviews
          </h1>
          <button className="add-review-button" onClick={() => setAdd(true)}>
            add review
          </button>
        </div>

        <div className="reviews-container">
          {job2?.map((rev) => (
            <div className="box">
              <div>
                <p>{rev.body!}</p>
                <span>{`Posted ${formatDistanceToNow(
                  new Date(rev.createdAt!)
                )} ago`}</span>
              </div>

              <p style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                <FaUser />
                <span> by {rev.user_id}</span>
              </p>
            </div>
          ))}
        </div>
        {job2?.length === 0 ? "no reviews" : null}
      </div>
    </div>
  );
};

export default EmployerPublicPortfolio;
