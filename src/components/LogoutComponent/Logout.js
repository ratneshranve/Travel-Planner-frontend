import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
function Logout(){
    const navigate=useNavigate();
  useEffect(()=>{
    localStorage.clear();
    navigate('/login');
  });
    return(
        <>
        </>
    )
}
export default Logout;