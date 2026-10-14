import { useNavigate } from "react-router-dom";
import "../styles/pages/questions.css";
import { useState } from "react";
import { usePostData } from "../hooks/usePostData";
import { useStore } from "../store/store";

const Questions = () => {
  const { user } = useStore();

  // logic - Navigation
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const goFoward = () => {
    if (page !== 5) {
      setPage(page + 1);
    }
  };
  const goBack = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  // logic - Addtional info
  const [location, setLocation] = useState(``);
  const [exp, setExp] = useState(``);

  // Data - Portfolio state
  const [portfolio, setPortfolio] = useState<any>({
    template: "ONE",
    name: "marco",
    surname: "ramchatan",
    occupation: "occupation",
  });

  const { postdata } = usePostData();

  const finish = () => {
    navigate(`/console/${user.user._id}/`);
  };

  const update = () => {
    portfolio.about = `hey this is the new about that we generated here`;
    postdata({ ...portfolio });
    navigate(`/console/${user.user._id}/`);
  };

  return (
    <div className="questions">
      <div className="questions-box">
        <div className="questions-box-top">
          <h1>Create Portfolio</h1>
          <p>Tell us about yourself</p>
          <p>{page.toString()}/ 4</p>
        </div>
        <div className="questions-container">
          {page === 1 ? (
            <div className="questions-page questions-page-one">
              <p>hi, what is your name and surname ?</p>
              <input
                type="text"
                placeholder="name"
                value={portfolio.name}
                onChange={(e) =>
                  setPortfolio((prevPortfolio: any) => ({
                    ...prevPortfolio,
                    name: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="surname"
                value={portfolio.surname}
                onChange={(e) =>
                  setPortfolio((prevPortfolio: any) => ({
                    ...prevPortfolio,
                    surname: e.target.value,
                  }))
                }
              />{" "}
            </div>
          ) : null}

          {page === 2 ? (
            <div className="questions-page questions-page-two">
              <p>nie to meet you marco ramcharan</p>
              <p>what do you do for a living ??</p>
              <input
                type="text"
                placeholder="occupation"
                value={portfolio.occupation}
                onChange={(e) =>
                  setPortfolio((prevPortfolio: any) => ({
                    ...prevPortfolio,
                    occupation: e.target.value,
                  }))
                }
              />{" "}
            </div>
          ) : null}

          {page === 3 ? (
            <div className="questions-page">
              <p>additonal info</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="location"
              />
              <input
                type="text"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                placeholder="years experience"
              />
            </div>
          ) : null}

          {page === 4 ? (
            <div className="questions-page">
              <p>pick a theme</p>
              <button
                disabled={portfolio.template === `ONE`}
                style={
                  portfolio.template === `ONE`
                    ? { backgroundColor: `blue` }
                    : { backgroundColor: `black` }
                }
                onClick={() =>
                  setPortfolio((prevPortfolio: any) => ({
                    ...prevPortfolio,
                    template: `ONE`,
                  }))
                }
              >
                light
              </button>
              <button
                disabled={portfolio.template === `TWO`}
                style={
                  portfolio.template === `TWO`
                    ? { backgroundColor: `blue` }
                    : { backgroundColor: `black` }
                }
                onClick={() =>
                  setPortfolio((prevPortfolio: any) => ({
                    ...prevPortfolio,
                    template: `TWO`,
                  }))
                }
              >
                light photo
              </button>
              <button
                style={
                  portfolio.template === `THREE`
                    ? { backgroundColor: `blue` }
                    : { backgroundColor: `black` }
                }
                disabled={portfolio.template === `THREE`}
                onClick={() =>
                  setPortfolio((prevPortfolio: any) => ({
                    ...prevPortfolio,
                    template: `THREE`,
                  }))
                }
              >
                dark
              </button>{" "}
            </div>
          ) : null}
        </div>
        <div className="questions-box-bottom">
          <button onClick={() => goBack()}>prev</button>
          {page === 4 ? (
            <button
              onClick={() => {
                update();
              }}
            >
              submit
            </button>
          ) : (
            <button onClick={() => goFoward()}>next</button>
          )}
          <button onClick={() => finish()}>skip</button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
