
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center min-h-screen justify-center bg-gradient-to-br from-costa-green/10 to-costa-blue/10">
      <h1 className="text-4xl font-bold mb-4 text-costa-green">Welcome to Costa Rica GeoQuest!</h1>
      <p className="mb-8 text-lg text-gray-700 font-medium max-w-xl text-center">
        Embark on an interactive geocaching adventure! Check in at 24 amazing cultural destinations, join in activities,
        collect points, earn badges, and unlock Costa Rica’s soul. Ready to start your journey?
      </p>
      <div className="flex gap-4 mb-8">
        <Button onClick={() => navigate('/plan')} className="bg-costa-blue text-white text-lg shadow-lg animate-fade-in">Plan Your Adventure</Button>
        <Button variant="outline" onClick={() => navigate('/map')} className="text-costa-green border-costa-green text-lg">
          Explore Map
        </Button>
      </div>
      <div className="space-x-4">
        <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
        <Button variant="ghost" onClick={() => navigate('/help')}>Help</Button>
        <Button variant="ghost" onClick={() => navigate('/profile')}>Profile</Button>
        <Button variant="ghost" onClick={() => navigate('/achievements')}>Achievements</Button>
      </div>
    </div>
  );
};

export default Index;
