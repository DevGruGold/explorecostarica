
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-16 px-8">
      <h1 className="text-3xl font-bold mb-4 text-costa-green">About GeoQuest</h1>
      <p className="mb-6 text-lg text-gray-700">
        GeoQuest is a playful and immersive geocaching game created to connect travelers with Costa Rica’s amazing natural beauty, culture, and people.
        <br /><br />
        <span className="font-medium text-costa-green">How does it work?</span><br />
        Select your adventure style and preferred regions. Explore hand-picked locations, join in on cultural activities, and store memories via journal/photos.
        <br /><br />
        Win badges, earn animated rewards, and learn about everything from Tico food to iconic wildlife!
      </p>
      <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  );
};

export default About;
