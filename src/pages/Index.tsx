
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';

const Index = () => {
  const navigate = useNavigate();
  const { isOnboarded } = useGame();

  useEffect(() => {
    // If user is already onboarded, navigate to the map page
    if (isOnboarded) {
      navigate('/map');
    }
  }, [isOnboarded, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-costa-blue-light to-costa-blue p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
            <span className="text-5xl">🇨🇷</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Pura Vida Quest</h1>
          <p className="text-white/90 text-lg">Discover the beauty and culture of Costa Rica</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-xl mb-6"
        >
          <h2 className="text-xl font-semibold text-costa-green mb-3">¡Bienvenidos!</h2>
          <p className="text-gray-600 mb-4">
            Embark on an adventure across 24 cultural destinations in Costa Rica. Check in at locations, 
            complete activities, and earn rewards as you experience the rich culture.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-costa-green/10 p-3 rounded-lg">
              <div className="text-2xl mb-2">🏞️</div>
              <p className="text-xs text-gray-700 font-medium">Explore Natural Wonders</p>
            </div>
            <div className="bg-costa-sunset-orange/10 p-3 rounded-lg">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="text-xs text-gray-700 font-medium">Taste Local Cuisine</p>
            </div>
            <div className="bg-costa-blue/10 p-3 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-xs text-gray-700 font-medium">Earn Rewards</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            onClick={() => navigate('/onboarding')} 
            className="w-full bg-costa-sunset-orange hover:bg-costa-sunset-orange/90 text-white font-semibold py-6 text-lg"
          >
            Start Your Adventure
          </Button>
        </motion.div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-white/80 text-sm mt-8"
      >
        Experience the essence of Costa Rica
      </motion.p>
    </div>
  );
};

export default Index;
