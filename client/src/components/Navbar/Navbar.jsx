import React , {useState , useEffect} from 'react'
import Link from '@mui/joy/Link';
import LoginIcon from '@mui/icons-material/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/authSlice';
import Typography from '@mui/joy/Typography';

const Navbar = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("auth"));
    setUser(profile);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("auth");
    setUser(null);
    dispatch(userLogout());
    window.location.reload();
  }

  return (
    <div className='mb-auto p-4'>
    <Link
        level="h3"
        underline="hover"
        variant="plain"
        startDecorator={ user ? <LogoutIcon /> : <LoginIcon/>}
        onClick={handleClick}
      > {user ? "Logout" : "Log In"} </Link> 
    </div>
  )
}

export default Navbar