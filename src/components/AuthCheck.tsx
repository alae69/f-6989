
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthCheckProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
}

const AuthCheck = ({ children, requiredRole }: AuthCheckProps) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn) {
      navigate('/login');
    } else if (requiredRole === 'admin' && userRole !== 'admin') {
      navigate('/');
    }
  }, [navigate, requiredRole]);
  
  return <>{children}</>;
};

export default AuthCheck;
