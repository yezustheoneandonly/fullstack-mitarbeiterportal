import { useEffect } from 'react';
import LogIn from './login';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
    const { autologin, isAuthenticated } = useAuth(); // Access autoLogin from the context

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            autologin()
        } else {
            navigate('/home');
        }
    }, [isAuthenticated]);


    return (
        <div>
            <LogIn />
        </div>
    );
};

export default Landing