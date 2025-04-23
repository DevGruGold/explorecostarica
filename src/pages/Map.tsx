import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';
import { MapPin, Info, Navigation, Users } from 'lucide-react';
import LocationCard from '@/components/LocationCard';
import CoinReward from "@/components/CoinReward";

// Import Costa Rica map image
import costaRicaMap from '../assets/costa-rica-map.jpg';
import CostaRicaMap from '@/components/CostaRicaMap';

// Avatar images for simulated Waze-style user markers 
const wazeUserAvatars = [
  "/placeholder.svg", // Default
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/15.jpg",
];

// Function to simulate random users on the map
function getRandomUsersOnMap(count: number) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      id: `sim-user-${i}`,
      lat: 8.7 + Math.random() * 2,  // these bounds fit CR
      lng: -85.7 + Math.random() * 2.5,
      avatar: wazeUserAvatars[(i + 1) % wazeUserAvatars.length],
      name: `Traveler${i + 1}`,
    });
  }
  return users;
}

const simulatedWazeUsers = getRandomUsersOnMap(7);

const Map = () => {
  const navigate = useNavigate();
  const { 
    locations, 
    user, 
    checkInLocation, 
    visitLocation, 
    selectedRegions,
    selectedTypes 
  } = useGame();

  // --- NEW: Spontaneous Adventure UI State ---
  const [planningAdventure, setPlanningAdventure] = useState(false);
  const [seeAdventureInvite, setSeeAdventureInvite] = useState(false);
  const [adventureWith, setAdventureWith] = useState<string | null>(null);

  // ========== (rest of map state)
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<{lat: number, lng: number} | null>(null);
  const [showCoin, setShowCoin] = useState(false);
  const [showDirections, setShowDirections] = useState(true);

  // Filter locations based on selectedRegions and selectedTypes
  useEffect(() => {
    let filtered = [...locations];
    
    if (selectedRegions.length > 0) {
      filtered = filtered.filter(loc => selectedRegions.includes(loc.region as any));
    }
    
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(loc => selectedTypes.includes(loc.type));
    }
    
    setFilteredLocations(filtered);
  }, [locations, selectedRegions, selectedTypes]);

  // Simulating getting user's position
  useEffect(() => {
    const simulateUserPosition = () => {
      // Random position in Costa Rica
      const lat = 9.7 + (Math.random() * 1);
      const lng = -84.0 - (Math.random() * 1);
      setUserPosition({ lat, lng });
    };
    
    simulateUserPosition();
  }, []);

  // When user starts a spontaneous adventure: tell other users (simulate only on UI)
  const handleAdventureClick = () => {
    setPlanningAdventure(true);
    toast("You're looking for an adventure buddy!", {
      description: "Other users can now join your spontaneous adventure.",
      icon: <Users className="w-5 h-5 text-costa-green" />
    });
    // Simulate a delay for another user "seeing" your invite
    setTimeout(() => setSeeAdventureInvite(true), 1500);
  };

  // Handle other user accepting adventure (simulated)
  const handleJoinAdventure = () => {
    setAdventureWith("Traveler2");
    setSeeAdventureInvite(false);
    toast("You joined an adventure with Traveler2! 🎉", {
      description: "Chat and meet up somewhere fun, or check in together.",
      icon: <Users className="w-5 h-5 text-costa-green" />
    });
  };

  // Leave/disband
  const handleEndAdventure = () => {
    setPlanningAdventure(false);
    setAdventureWith(null);
    setSeeAdventureInvite(false);
    toast("Adventure ended", {
      description: "Feel free to start a new one anytime!",
    });
  };

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(prev => prev === locationId ? null : locationId);
    setShowDirections(false);
  };

  const handleCheckIn = (locationId: string) => {
    // Simulate checking in based on geolocation
    // In a real app, we'd compare actual user position with location position
    const shouldSucceed = Math.random() > 0.2; // 80% chance of success
    
    if (shouldSucceed) {
      checkInLocation(locationId);
      setSelectedLocation(null);
      setShowCoin(true);
      
      // Play sound when coin appears
      const audio = new Audio('/coin-reward.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log("Audio play failed:", err));
      
      toast.success("Check-in successful!", {
        description: "You've earned points for visiting this location.",
      });
    } else {
      toast.error("Check-in failed", {
        description: "You need to be closer to this location to check in.",
      });
    }
  };

  const handleViewDetails = (locationId: string) => {
    navigate(`/quest/${locationId}`);
  };

  const dismissDirections = () => {
    setShowDirections(false);
    localStorage.setItem('mapDirectionsShown', 'true');
  };

  // Check if directions were already shown
  useEffect(() => {
    const directionsShown = localStorage.getItem('mapDirectionsShown');
    if (directionsShown) {
      setShowDirections(false);
    }
  }, []);

  // Instead of pop-up card inline on map, use a callback
  const renderSelectedLocationCard = (location: any) => (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-3 w-48 z-20 animate-fade-in">
      <h4 className="font-medium text-sm">{location.name}</h4>
      <p className="text-xs text-gray-500 mb-2">{location.type} • {location.pointValue} pts</p>
      <div className="flex gap-2 mt-2">
        <Button 
          size="sm" 
          className="w-full text-xs" 
          onClick={() => handleCheckIn(location.id)}
          disabled={location.visited}
        >
          {location.visited ? 'Visited' : 'Check In'}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full text-xs"
          onClick={() => handleViewDetails(location.id)}
        >
          <Info size={12} className="mr-1" /> Info
        </Button>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
      {/* Coin reward animation */}
      <CoinReward visible={showCoin} onDone={() => setShowCoin(false)} amount={50} />

      {/* Spontaneous Adventure Button, visible at all times */}
      <div className="flex justify-end items-center gap-2 mb-2">
        {/* Show leave/stop if in adventure */}
        {planningAdventure && !adventureWith && (
          <Badge className="bg-costa-green/90 px-3 py-1 animate-pulse">Waiting for buddy...</Badge>
        )}
        {adventureWith && (
          <Badge className="bg-costa-blue/90 px-3 py-1">Paired with <span className="ml-1 font-semibold">{adventureWith}</span></Badge>
        )}
        {planningAdventure || adventureWith ? (
          <Button variant="destructive" size="sm" onClick={handleEndAdventure}>End Adventure</Button>
        ) : (
          <Popover open={seeAdventureInvite} onOpenChange={setSeeAdventureInvite}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                className="bg-costa-green text-white hover:bg-costa-green/90 shadow-lg animate-fade-in"
                onClick={handleAdventureClick}
              >
                <Users className="mr-1 h-5 w-5" />
                Spontaneous Adventure
              </Button>
            </PopoverTrigger>
            {/* Popover appears when another user "sees" your request */}
            <PopoverContent side="bottom" className="max-w-xs w-full z-40">
              <div className="flex items-start gap-2">
                <img src={wazeUserAvatars[2]} alt="Traveler2" className="w-10 h-10 rounded-full border-2 border-costa-blue shadow" />
                <div>
                  <h4 className="font-bold mb-1">Traveler2 wants to join!</h4>
                  <p className="text-sm mb-2">"Hey, let's team up and visit someplace cool right now?"</p>
                  <Button size="sm" className="w-full" onClick={handleJoinAdventure}>Accept & Start</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-costa-green">Explore Costa Rica</h1>
          <p className="text-gray-600">Find adventures nearby</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/plan')}
          className="border-costa-green text-costa-green"
        >
          Filter
        </Button>
      </div>

      {/* Filter badges */}
      {(selectedRegions.length > 0 || selectedTypes.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedRegions.map(region => (
            <Badge key={region} variant="secondary" className="bg-costa-blue/10 text-costa-blue">
              {region}
            </Badge>
          ))}
          {selectedTypes.map(type => (
            <Badge key={type} variant="secondary" className="bg-costa-green/10 text-costa-green">
              {type}
            </Badge>
          ))}
        </div>
      )}

      {/* User directions overlay */}
      {showDirections && (
        <div className="absolute inset-x-0 top-32 z-30 bg-costa-blue/90 text-white p-4 rounded-md shadow-lg mx-4 animate-fade-in">
          <div className="flex items-start">
            <Navigation className="mr-2 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-2">How to use the map:</h3>
              <ul className="text-sm space-y-2 mb-3">
                <li className="flex items-center"><span className="mr-2">•</span> Tap on a location pin <MapPin className="inline mx-1 h-4 w-4" /> to see details</li>
                <li className="flex items-center"><span className="mr-2">•</span> Use "Check In" when you're physically at a location</li>
                <li className="flex items-center"><span className="mr-2">•</span> Visit the "Info" page to learn about quests</li>
                <li className="flex items-center"><span className="mr-2">•</span> Other travelers <img src={wazeUserAvatars[1]} className="inline h-4 w-4 rounded-full mx-1" /> are exploring too!</li>
                <li className="flex items-center"><span className="mr-2">•</span> NEW: Tap <Users className="inline h-4 w-4 mx-1" /> Spontaneous Adventure to find a buddy right now!</li>
              </ul>
              <Button size="sm" onClick={dismissDirections} className="w-full">Got it</Button>
            </div>
          </div>
        </div>
      )}

      {/* -- MAP AREA -- */}
      <CostaRicaMap
        userPosition={userPosition}
        planningAdventure={planningAdventure}
        adventureWith={adventureWith}
        simulatedWazeUsers={simulatedWazeUsers}
        filteredLocations={filteredLocations}
        selectedLocation={selectedLocation}
        handleLocationClick={handleLocationClick}
        renderSelectedLocationCard={renderSelectedLocationCard}
      />

      {/* Nearby locations */}
      <h2 className="font-semibold text-lg mb-2">Nearby Adventures</h2>
      <div className="space-y-4">
        {filteredLocations.slice(0, 3).map(location => (
          <LocationCard
            key={location.id}
            location={location}
            onCheckIn={handleCheckIn}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Recommended locations */}
      <h2 className="font-semibold text-lg mt-6 mb-2">Recommended For You</h2>
      <div className="space-y-4">
        {filteredLocations.slice(3, 6).map(location => (
          <LocationCard
            key={location.id}
            location={location}
            onCheckIn={handleCheckIn}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Map;
