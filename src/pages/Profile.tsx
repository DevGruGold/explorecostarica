
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  MapPin, 
  CheckCircle2, 
  History,
  LogOut
} from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, locations, badges } = useGame();
  
  // Calculate statistics
  const visitedLocations = locations.filter(l => l.visited).length;
  const totalLocations = locations.length;
  const completedActivities = locations.reduce(
    (sum, location) => sum + location.activities.filter(a => a.completed).length, 
    0
  );
  const totalActivities = locations.reduce(
    (sum, location) => sum + location.activities.length, 
    0
  );
  const totalPointsPossible = locations.reduce(
    (sum, location) => sum + location.pointValue + location.activities.reduce((actSum, act) => actSum + act.pointValue, 0),
    0
  );
  
  // Calculate level progress
  const currentLevelPoints = (user.level - 1) * 500;
  const nextLevelPoints = user.level * 500;
  const levelProgress = ((user.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
  
  const handleReset = () => {
    localStorage.clear();
    toast.success("Adventure reset!", {
      description: "Start your Costa Rican journey anew.",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="pb-16">
      {/* Profile header */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-costa-green/20 flex items-center justify-center text-costa-green font-bold text-xl mr-4">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">Level {user.level} Explorer</p>
        </div>
      </div>
      
      {/* Level progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Level {user.level}</span>
            <span className="text-sm text-gray-500">Level {user.level + 1}</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm">{user.points} pts</span>
            <span className="text-sm">{nextLevelPoints} pts</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Statistics */}
      <h2 className="text-xl font-bold mb-4">Your Progress</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-costa-green/10 p-3 inline-block rounded-full mb-2">
              <MapPin className="h-5 w-5 text-costa-green" />
            </div>
            <div className="text-2xl font-bold">{visitedLocations}/{totalLocations}</div>
            <div className="text-sm text-gray-500">Locations</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-costa-blue/10 p-3 inline-block rounded-full mb-2">
              <CheckCircle2 className="h-5 w-5 text-costa-blue" />
            </div>
            <div className="text-2xl font-bold">{completedActivities}/{totalActivities}</div>
            <div className="text-sm text-gray-500">Activities</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-costa-sunset-orange/10 p-3 inline-block rounded-full mb-2">
              <Award className="h-5 w-5 text-costa-sunset-orange" />
            </div>
            <div className="text-2xl font-bold">{user.achievements.length}/{badges.length}</div>
            <div className="text-sm text-gray-500">Badges</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="bg-costa-earth-coffee/10 p-3 inline-block rounded-full mb-2">
              <Award className="h-5 w-5 text-costa-earth-coffee" />
            </div>
            <div className="text-2xl font-bold">{user.points}/{totalPointsPossible}</div>
            <div className="text-sm text-gray-500">Total Points</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent history */}
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <Card className="mb-6">
        <CardContent className="p-4">
          {visitedLocations > 0 ? (
            <div className="space-y-4">
              {locations
                .filter(loc => loc.visited)
                .sort((a, b) => new Date(b.visitDate || 0).getTime() - new Date(a.visitDate || 0).getTime())
                .slice(0, 3)
                .map(location => (
                  <div key={location.id} className="flex items-start">
                    <div className="bg-costa-green/10 p-2 rounded-full mr-3">
                      <History className="h-4 w-4 text-costa-green" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{location.name}</h3>
                      <p className="text-xs text-gray-500">
                        {location.visitDate ? formatDate(location.visitDate) : "Recently"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No activity yet. Start exploring!</p>
          )}
        </CardContent>
      </Card>
      
      {/* Recent achievements */}
      <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
      <Card className="mb-6">
        <CardContent className="p-4">
          {user.achievements.length > 0 ? (
            <div className="space-y-4">
              {user.achievements
                .sort((a, b) => new Date(b.unlockDate || 0).getTime() - new Date(a.unlockDate || 0).getTime())
                .slice(0, 3)
                .map(achievement => (
                  <div key={achievement.id} className="flex items-start">
                    <div className="bg-costa-sunset-orange/10 p-2 rounded-full mr-3">
                      <Award className="h-4 w-4 text-costa-sunset-orange" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{achievement.name}</h3>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                      <p className="text-xs text-gray-500">
                        {achievement.unlockDate ? formatDate(achievement.unlockDate) : "Recently"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No achievements yet. Keep exploring!</p>
          )}
        </CardContent>
      </Card>
      
      {/* Account actions */}
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center text-destructive hover:bg-destructive/10"
        onClick={handleReset}
      >
        <LogOut className="h-4 w-4 mr-2" /> Reset Adventure
      </Button>
    </div>
  );
};

export default Profile;
