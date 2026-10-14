import { Link } from "react-router-dom";
import '../styles/pages/chooseAuth.css'


const EmployerAuth = () => {

  return (
    <div className="chooseAuth">
      <Link to="/auth/employer/login">login</Link>
      <Link to="/auth/employer/signup">signup</Link>
    </div>
  );
};

export default EmployerAuth;
