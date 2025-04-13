
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';
import { MapPin, Info } from 'lucide-react';
import LocationCard from '@/components/LocationCard';

// Import Costa Rica map image
import costaRicaMap from '../assets/costa-rica-map.jpg';

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

  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<{lat: number, lng: number} | null>(null);

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

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(prev => prev === locationId ? null : locationId);
  };

  const handleCheckIn = (locationId: string) => {
    // Simulate checking in based on geolocation
    // In a real app, we'd compare actual user position with location position
    const shouldSucceed = Math.random() > 0.2; // 80% chance of success
    
    if (shouldSucceed) {
      checkInLocation(locationId);
      setSelectedLocation(null);
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

  return (
    <div className="pb-16">
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

      {/* Map visualization with actual Costa Rica map */}
      <div className="w-full h-60 rounded-lg relative mb-4 overflow-hidden border border-gray-200 shadow-md">
        {/* Costa Rica Map Background */}
        <div className="absolute inset-0 bg-costa-blue-light/20">
          <img 
            src={costaRicaMap} 
            alt="Map of Costa Rica" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        <div className="absolute inset-0 p-2">
          {/* User location */}
          {userPosition && (
            <div 
              className="absolute w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse"
              style={{ 
                left: `${Math.random() * 80 + 10}%`, 
                top: `${Math.random() * 80 + 10}%` 
              }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full opacity-30 absolute -left-2 -top-2"></div>
            </div>
          )}
          
          {/* Location pins */}
          {filteredLocations.map((location) => (
            <div 
              key={location.id} 
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedLocation === location.id ? 'z-10' : 'z-0'
              }`}
              style={{ 
                left: `${Math.random() * 80 + 10}%`, 
                top: `${Math.random() * 80 + 10}%` 
              }}
              onClick={() => handleLocationClick(location.id)}
            >
              <div className={`
                p-1 rounded-full
                ${location.visited 
                  ? 'bg-costa-earth-clay text-white' 
                  : 'bg-costa-green text-white animate-bounce-gentle'}
              `}>
                <MapPin size={selectedLocation === location.id ? 24 : 20} />
              </div>
              
              {/* Pop-up info card when selected */}
              {selectedLocation === location.id && (
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
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 right-2 bg-white p-1 rounded text-xs font-semibold">
          Costa Rica
        </div>
      </div>

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
