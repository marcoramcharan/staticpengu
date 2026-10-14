import { FaLocationPin } from "react-icons/fa6";
import "animate.css";

const FullJobSkeleton: React.FC = () => {
  return (
    <div className="right">
      <div className="right-content">
        <div className="right-content-top">
          <div
            className="animate__animated animate__pulse"
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "24px",
              marginBottom: "16px",
            }}
          />
          <div
            className="animate__animated animate__pulse"
            style={{
              backgroundColor: "black",
              width: "60%",
              height: "20px",
              marginBottom: "16px",
            }}
          />
          <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <FaLocationPin />
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "200px",
                height: "20px",
              }}
            />
          </span>
          <div className="salty">
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "150px",
                height: "20px",
                marginBottom: "8px",
              }}
            />
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "120px",
                height: "20px",
              }}
            />
          </div>
          <div className="right-content-top-buttons">
            <button
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100px",
                height: "36px",
                marginRight: "8px",
              }}
            />
            <button
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100px",
                height: "36px",
                marginRight: "8px",
              }}
            />
            <button
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100px",
                height: "36px",
              }}
            />
          </div>
        </div>
        <div className="right-content-bottom">
          <div className="right-content-bottom-box">
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "24px",
                marginBottom: "8px",
              }}
            />
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "100px",
              }}
            />
          </div>

          <div className="right-content-bottom-box">
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "24px",
                marginBottom: "8px",
              }}
            />
            <div>
              <div
                className="animate__animated animate__pulse"
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  height: "20px",
                  marginBottom: "8px",
                }}
              />
              <div
                className="animate__animated animate__pulse"
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  height: "20px",
                  marginBottom: "8px",
                }}
              />
            </div>
          </div>

          <div className="right-content-bottom-box">
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "24px",
                marginBottom: "8px",
              }}
            />
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "20px",
              }}
            />
          </div>

          <div className="right-content-bottom-box">
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "24px",
                marginBottom: "8px",
              }}
            />
            <div
              className="animate__animated animate__pulse"
              style={{
                backgroundColor: "black",
                width: "100%",
                height: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullJobSkeleton;
