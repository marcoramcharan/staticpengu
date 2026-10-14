import { Link } from "react-router-dom";
import '../styles/pages/chooseAuth.css'

const EmployeeAuth = () => {

  return (
    <div className="chooseAuth">
      <Link to="/auth/employee/login">login</Link>
      <Link to="/auth/employee/signup">signup</Link>
    </div>
  );
};

export default EmployeeAuth;
