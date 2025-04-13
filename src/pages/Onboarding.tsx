
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useGame } from '@/context/GameContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const interestOptions = [
  { id: 'historical', label: 'Historical Sites', emoji: '🏛️' },
  { id: 'natural', label: 'Natural Wonders', emoji: '🌋' },
  { id: 'cultural', label: 'Cultural Experiences', emoji: '💃' },
  { id: 'culinary', label: 'Local Cuisine', emoji: '🍽️' },
  { id: 'wildlife', label: 'Wildlife & Nature', emoji: '🦋' },
  { id: 'adventure', label: 'Adventure Activities', emoji: '🧗‍♂️' },
  { id: 'beaches', label: 'Beaches', emoji: '🏖️' },
  { id: 'indigenous', label: 'Indigenous Culture', emoji: '🏹' }
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, setUser, setIsOnboarded } = useGame();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user.name);
  const [interests, setInterests] = useState<string[]>([]);
  
  const handleInterestToggle = (value: string) => {
    setInterests(current => 
      current.includes(value)
        ? current.filter(i => i !== value)
        : [...current, value]
    );
  };
  
  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2) {
      completeOnboarding();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const completeOnboarding = () => {
    setUser(prev => ({
      ...prev,
      name,
      interests
    }));
    setIsOnboarded(true);
    navigate('/plan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-costa-blue-light to-costa-blue">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-costa-sunset-orange' : 'bg-white'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-costa-sunset-orange' : 'bg-white'}`}></div>
            </div>
          </div>

          {/* Step 1: Name input */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome, Explorer!</h2>
              <p className="text-gray-600 mb-6">Let's start your Costa Rican adventure. First, what should we call you?</p>
              
              <div className="mb-6">
                <Label htmlFor="name" className="text-gray-700">Your name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  placeholder="Enter your name"
                />
              </div>
              
              <Button 
                onClick={handleNext} 
                disabled={!name.trim()}
                className="w-full bg-costa-green hover:bg-costa-green-dark"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Interests selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What interests you, {name}?</h2>
              <p className="text-gray-600 mb-6">Select the experiences you'd like to discover in Costa Rica.</p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {interestOptions.map(option => (
                  <div 
                    key={option.id} 
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      interests.includes(option.id) 
                        ? 'border-costa-green bg-costa-green/10' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleInterestToggle(option.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={option.id}
                        checked={interests.includes(option.id)}
                        onCheckedChange={() => handleInterestToggle(option.id)}
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{option.emoji}</span>
                        <Label htmlFor={option.id} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleBack} 
                  variant="outline"
                  className="w-1/3"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="w-2/3 bg-costa-green hover:bg-costa-green-dark"
                >
                  Start Your Journey <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;
