
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4 text-costa-blue">Help & FAQs</h1>
      <ul className="mb-6 space-y-3">
        <li>
          <span className="font-semibold text-costa-green">How do I earn points?</span>
          <p>Check in at destinations, complete cultural challenges, upload photos or journals on location pages.</p>
        </li>
        <li>
          <span className="font-semibold text-costa-green">How do I know where to go?</span>
          <p>Use the “Plan” page or the Map view to see all suggested spots, then visit them in any order.</p>
        </li>
        <li>
          <span className="font-semibold text-costa-green">Do I need WiFi?</span>
          <p>Progress is saved locally. Connect to WiFi at your destination to sync and level up!</p>
        </li>
        <li>
          <span className="font-semibold text-costa-green">What’s with the coins and badges?</span>
          <p>They’re your reward for exploring, participating, and making memories! Collect them all.</p>
        </li>
      </ul>
      <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  );
};

export default Help;
