import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    // Reindirizza alla home page se l'utente non è loggato
    return <Navigate to="/home" replace />;
  }

  if (user.email === 'guest') {
    // Reindirizza alla home page se l'utente è guest
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
