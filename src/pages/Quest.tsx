
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  Camera, 
  PenSquare,
  Award
} from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Quest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locations, checkInLocation, completeActivity } = useGame();
  const [showPhotoConfirm, setShowPhotoConfirm] = useState(false);
  const [showJournalConfirm, setShowJournalConfirm] = useState(false);
  
  const location = locations.find(loc => loc.id === id);
  
  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-semibold mb-4">Location not found</h2>
        <Button onClick={() => navigate('/map')}>Return to Map</Button>
      </div>
    );
  }

  const handleCheckIn = () => {
    checkInLocation(location.id);
  };
  
  const handleCompleteActivity = (activityId: string) => {
    completeActivity(location.id, activityId);
  };

  const handlePhotoSubmit = (activityId: string) => {
    setShowPhotoConfirm(false);
    
    // Simulate photo submission success
    setTimeout(() => {
      toast.success("Photo uploaded successfully!");
      handleCompleteActivity(activityId);
    }, 500);
  };

  const handleJournalSubmit = (activityId: string) => {
    setShowJournalConfirm(false);
    
    // Simulate journal submission success
    setTimeout(() => {
      toast.success("Journal entry saved!");
      handleCompleteActivity(activityId);
    }, 500);
  };

  return (
    <div className="pb-16">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0" 
        onClick={() => navigate('/map')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Map
      </Button>
      
      {/* Location header */}
      <div className="relative rounded-lg overflow-hidden mb-4">
        <div className="h-48 bg-gradient-to-r from-costa-green/90 to-costa-blue/90 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl mb-2">
              {location.type === 'Natural' && "🏞️"}
              {location.type === 'Cultural' && "🎭"}
              {location.type === 'Historical' && "🏛️"}
              {location.type === 'Culinary' && "🍽️"}
              {location.type === 'Adventure' && "🧗‍♀️"}
            </span>
          </div>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-center">
            <div>
              <Badge className="mb-1" variant="outline">
                {location.type}
              </Badge>
              <h1 className="text-xl font-bold text-white">{location.name}</h1>
            </div>
            <div className="bg-costa-green rounded-full px-3 py-1 text-white font-bold">
              {location.pointValue} pts
            </div>
          </div>
        </div>
      </div>
      
      {/* Description and details */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>About this location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="mr-2 h-4 w-4" /> {location.region}
          </div>
          <p className="text-gray-700">{location.description}</p>
        </CardContent>
      </Card>
      
      {/* Check-in card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" /> Location Check-in
          </CardTitle>
          <CardDescription>Visit this location physically to check in</CardDescription>
        </CardHeader>
        <CardContent>
          {!location.visited ? (
            <Button 
              onClick={handleCheckIn} 
              className="w-full bg-costa-green hover:bg-costa-green-dark"
            >
              Check In Here
            </Button>
          ) : (
            <div className="flex items-center text-costa-earth-clay">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              <span className="font-medium">You've visited this location!</span>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Activities */}
      <h2 className="text-xl font-bold mt-6 mb-3">Activities</h2>
      <p className="text-gray-600 mb-4">Complete these activities to earn more points:</p>
      
      <div className="space-y-4">
        {location.activities.map(activity => (
          <Card key={activity.id} className={activity.completed ? "border-costa-earth-clay/20" : ""}>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-start">
                <span>{activity.name}</span>
                <Badge className={activity.completed ? "bg-costa-earth-clay" : "bg-costa-blue"}>
                  {activity.pointValue} pts
                </Badge>
              </CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {activity.completed ? (
                <div className="flex items-center text-costa-earth-clay">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  <span className="font-medium">Completed!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  {/* Activity completion options */}
                  {activity.name.toLowerCase().includes('photo') && (
                    <Button 
                      onClick={() => setShowPhotoConfirm(true)}
                      className="flex-1 bg-costa-blue hover:bg-costa-blue-dark"
                    >
                      <Camera className="mr-2 h-4 w-4" /> Take Photo
                    </Button>
                  )}
                  
                  {!activity.name.toLowerCase().includes('photo') && (
                    <Button 
                      onClick={() => setShowJournalConfirm(true)}
                      className="flex-1"
                    >
                      <PenSquare className="mr-2 h-4 w-4" /> Complete Activity
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Potential rewards */}
      <h2 className="text-xl font-bold mt-6 mb-3">Potential Rewards</h2>
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="bg-costa-sunset-yellow/10 p-3 rounded-full mb-2">
                <Award className="text-costa-sunset-yellow h-6 w-6" />
              </div>
              <span className="text-xs text-center">Nature Lover Badge</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-costa-sunset-orange/10 p-3 rounded-full mb-2">
                <Award className="text-costa-sunset-orange h-6 w-6" />
              </div>
              <span className="text-xs text-center">Region Explorer</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-costa-blue/10 p-3 rounded-full mb-2">
                <Award className="text-costa-blue h-6 w-6" />
              </div>
              <span className="text-xs text-center">Pura Vida Master</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Photo confirmation modal */}
      {showPhotoConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
          onClick={() => setShowPhotoConfirm(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">Upload Photo</h3>
            <p className="text-gray-600 mb-4">Take or upload a photo to complete this activity.</p>
            
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="h-10 w-10 text-gray-400" />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPhotoConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-costa-green" 
                onClick={() => {
                  const activityId = location.activities.find(a => !a.completed && a.name.toLowerCase().includes('photo'))?.id;
                  if (activityId) handlePhotoSubmit(activityId);
                }}
              >
                Upload
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Journal confirmation modal */}
      {showJournalConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4"
          onClick={() => setShowJournalConfirm(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-4 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">Complete Activity</h3>
            <p className="text-gray-600 mb-4">Confirm that you've completed this activity to earn points.</p>
            
            <div className="p-4 border rounded-lg mb-4 text-center">
              <p className="text-lg font-medium">
                {location.activities.find(a => !a.completed && !a.name.toLowerCase().includes('photo'))?.name}
              </p>
              <p className="text-sm text-gray-500">
                {location.activities.find(a => !a.completed && !a.name.toLowerCase().includes('photo'))?.description}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowJournalConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-costa-green" 
                onClick={() => {
                  const activityId = location.activities.find(a => !a.completed && !a.name.toLowerCase().includes('photo'))?.id;
                  if (activityId) handleJournalSubmit(activityId);
                }}
              >
                Complete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Quest;
