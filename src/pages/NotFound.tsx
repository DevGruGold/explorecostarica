
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-costa-green mb-4">404</h1>
      <p className="mb-6 text-lg font-semibold text-gray-600">Whoops! This page doesn’t exist.</p>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  );
};

export default NotFound;
