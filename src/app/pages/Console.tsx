import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/pages/console.css";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import ConfirmDisable from "../components/dialogs/ConfirmDisable";
import useAuthenticatedGetRequest from "../hooks/useGetData";
import { useStore } from "../store/store";
import ConfirmEnable from "../components/dialogs/ConfirmEnable";
import { api } from "../api/api";

const Console = () => {
  const { user } = useStore();
  const link = `https://iportfolio-console.vercel.app/portfolio/${user?.user?.username}`;

  const navigate = useNavigate();
  const [showStatusDisable, setStatusDisable] = useState(false);
  const [showStatusEnable, setStatusEnable] = useState(false);

  const goTo = (path: string) => {
    navigate(path);
  };

  const goTo2 = (url: string) => {
    window.open(url, "_blank");
  };

  function copyToClipboard(text: string) {
    // Use the asynchronous Clipboard API
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  const { userID } = useParams();

  const { data, refetch } = useAuthenticatedGetRequest(
    `${api}/api/projects/${userID}`,
    user.token
  );

  return (
    <div className="console">
      {showStatusDisable ? (
        <ConfirmDisable
          refetch={refetch}
          onCancel={() => {
            setStatusDisable(false);
            refetch();
          }}
        />
      ) : null}
      {showStatusEnable ? (
        <ConfirmEnable
          refetch={refetch}
          onCancel={() => {
            setStatusEnable(false);
            refetch();
          }}
        />
      ) : null}

      {/* the console heading */}
      <div
        style={{
          width: `100%`,
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <h1 className="console-heading">portfoliohub</h1>
        <span className="console-username">{user?.user?.username}</span>
      </div>
      {/* section one */}
      <div className="console-container">
        <h2 className="console-container-heading">url</h2>
        <div className="console-container-box">
          <Link to={link}>{link}</Link>
          <div className="url-box">
            <button
              onClick={() =>
                copyToClipboard(
                  `https://iportfolio-console.vercel.app/portfolio/${user.user.username}`
                )
              }
            >
              copy
            </button>
            <button
              onClick={() =>
                goTo2(
                  `https://iportfolio-console.vercel.app/portfolio/${user.user.username}`
                )
              }
            >
              visit
            </button>
          </div>
        </div>
      </div>
      {/* section two */}
      <div className="console-container">
        <h2 className="console-container-heading">general</h2>
        <div className="console-container-box hover">
          <p>edit</p>
          <MdEdit
            className="edit-icon"
            onClick={() => goTo(`/console/${userID}/portfolio`)}
          />
        </div>
        <div
          onClick={() => {
            if (data?.active === true) {
              setStatusDisable(true);
            } else {
              setStatusEnable(true);
            }
          }}
          className="console-container-box hover"
        >
          <div>
            <p>status</p>
            <span>{data?.active.toString()}</span>
          </div>
          <MdEdit className="edit-icon" />
        </div>
      </div>
      {/* section three */}
      <div className="console-container">
        <h2 className="console-container-heading">statistics</h2>
        <div className="console-container-box">
          <div>
            <p>views</p>
            <span>
              {data?.views >= 0
                ? data?.views?.toString()
                : `no data from server`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Console;
