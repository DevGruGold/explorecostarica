
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Award,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

const Achievements = () => {
  const { badges, user } = useGame();
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  
  const unlockedBadges = badges.filter(badge => badge.isUnlocked);
  const lockedBadges = badges.filter(badge => !badge.isUnlocked);
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Recently";
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const currentBadge = badges.find(b => b.id === selectedBadge);

  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Achievements</h1>
        <p className="text-gray-600">Collect badges as you explore Costa Rica</p>
      </div>
      
      {/* User progress summary */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="bg-costa-sunset-orange/10 p-3 rounded-full mr-4">
              <Award className="h-6 w-6 text-costa-sunset-orange" />
            </div>
            <div>
              <h3 className="font-semibold">Your Collection</h3>
              <p className="text-sm text-gray-500">
                You've earned {unlockedBadges.length} out of {badges.length} badges
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Unlocked badges */}
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <CheckCircle2 className="mr-2 h-5 w-5 text-costa-green" />
        Unlocked Badges ({unlockedBadges.length})
      </h2>
      
      {unlockedBadges.length > 0 ? (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {unlockedBadges.map(badge => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={() => setSelectedBadge(badge.id)}
            >
              <Card className="border-costa-green/20 h-28 flex flex-col items-center justify-center text-center p-2">
                <div className="w-12 h-12 rounded-full bg-costa-green/10 flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-costa-green" />
                </div>
                <p className="text-xs font-medium line-clamp-2">{badge.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="mb-6">
          <CardContent className="p-4 text-center">
            <p className="text-gray-500 py-2">Start exploring to earn badges!</p>
          </CardContent>
        </Card>
      )}
      
      {/* Locked badges */}
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <Lock className="mr-2 h-5 w-5 text-gray-400" />
        Badges to Collect ({lockedBadges.length})
      </h2>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {lockedBadges.map(badge => (
          <motion.div
            key={badge.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => setSelectedBadge(badge.id)}
          >
            <Card className="bg-gray-50 border-gray-200 h-28 flex flex-col items-center justify-center text-center p-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs font-medium text-gray-400 line-clamp-2">{badge.name}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Badge detail modal */}
      {selectedBadge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {currentBadge && (
              <>
                <div className="flex justify-center mb-4">
                  <div 
                    className={`w-24 h-24 rounded-full ${
                      currentBadge.isUnlocked 
                        ? 'bg-costa-green/10' 
                        : 'bg-gray-100'
                    } flex items-center justify-center`}
                  >
                    {currentBadge.isUnlocked ? (
                      <Award className="h-12 w-12 text-costa-green" />
                    ) : (
                      <Lock className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-center mb-1">{currentBadge.name}</h3>
                
                <div className="flex justify-center mb-4">
                  <Badge className={currentBadge.isUnlocked ? 'bg-costa-green' : 'bg-gray-300'}>
                    {currentBadge.isUnlocked ? 'Unlocked' : 'Locked'}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-center mb-2">{currentBadge.description}</p>
                
                {currentBadge.isUnlocked && currentBadge.unlockDate && (
                  <p className="text-sm text-gray-500 text-center">
                    Earned on {formatDate(currentBadge.unlockDate)}
                  </p>
                )}
                
                {currentBadge.isUnlocked && (
                  <div className="mt-4 p-3 bg-costa-green/10 rounded-lg text-center">
                    <p className="text-costa-green font-medium">+100 bonus points earned!</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
      
      {/* Rewards info */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Rewards</CardTitle>
          <CardDescription>Earn bonus points and unlock special content</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <Award className="h-4 w-4 text-costa-sunset-orange mr-2 mt-0.5" />
              <span>Each badge awards 100 bonus points</span>
            </li>
            <li className="flex items-start">
              <Award className="h-4 w-4 text-costa-sunset-orange mr-2 mt-0.5" />
              <span>Collect all badges to become a Costa Rica expert</span>
            </li>
            <li className="flex items-start">
              <Award className="h-4 w-4 text-costa-sunset-orange mr-2 mt-0.5" />
              <span>Share your achievements with friends</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
