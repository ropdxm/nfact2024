import './login.css';
import { useContext } from "../Context";
import { useNavigate } from "react-router";

const Profile = () => {
  const {user} = useContext();
  const navigate = useNavigate();


    if(!user){
        navigate('/login');
        return;
    }

  return (
    <main>
      <div className="my-profile">
        <h2>Email: {user?.email}</h2>
        <h2>Password: {user?.password}</h2>
      </div>
    </main>
  )
}

export default Profile