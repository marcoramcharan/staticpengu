import { LiaCircle } from "react-icons/lia";
import "../styles/components/jobsList.css";

const JobsListSkeleton = () => {
  return (
    <div className="left">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="box">
          <div className="left-box-top">
            <button
              style={{
                backgroundColor: "black",
                width: "80px",
                height: "24px",
                marginRight: "8px",
              }}
              className="pulse"
            />
            <button
              style={{
                backgroundColor: "black",
                width: "80px",
                height: "24px",
              }}
              className="pulse"
            />
          </div>

          <div
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "24px",
              margin: "16px 0",
            }}
            className="pulse"
          />
          <div className="comploc">
            <span
              className="cursor-hover pulse"
              style={{
                backgroundColor: "black",
                width: "150px",
                height: "20px",
                display: "block",
                marginBottom: "8px",
              }}
            />
            <span
              className="pulse"
              style={{
                backgroundColor: "black",
                width: "100px",
                height: "20px",
                display: "block",
              }}
            />
          </div>
          <div className="salty">
            <div
              className="salary pulse"
              style={{
                backgroundColor: "black",
                width: "120px",
                height: "20px",
                marginBottom: "8px",
              }}
            />
            <div
              className="type pulse"
              style={{
                backgroundColor: "black",
                width: "100px",
                height: "20px",
              }}
            />
          </div>

          <div
            style={{
              color: "gray",
              backgroundColor: "black",
              width: "100%",
              height: "40px",
              marginBottom: "16px",
            }}
            className="req pulse"
          >
            <div className="req-box">
              {[...Array(4)].map((_, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <LiaCircle />
                  <div
                    style={{
                      backgroundColor: "black",
                      width: "80%",
                      height: "20px",
                      marginBottom: "8px",
                    }}
                    className="pulse"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "black",
              width: "100px",
              height: "14px",
              marginTop: "16px",
            }}
            className="pulse"
          />
        </div>
      ))}
    </div>
  );
};

export default JobsListSkeleton;
