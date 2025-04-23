
import React from 'react';
import { MapPin } from "lucide-react";
import costaRicaMap from '../assets/costa-rica-map.jpg';

interface WazeUser {
  id: string;
  lat: number;
  lng: number;
  avatar: string;
  name: string;
}
interface Location {
  id: string;
  name: string;
  type: string;
  region: string;
  visited?: boolean;
  pointValue: number;
}
interface CostaRicaMapProps {
  userPosition: { lat: number, lng: number } | null;
  planningAdventure: boolean;
  adventureWith: string | null;
  simulatedWazeUsers: WazeUser[];
  filteredLocations: Location[];
  selectedLocation: string | null;
  handleLocationClick: (id: string) => void;
  // For pin overlays
  renderSelectedLocationCard: (location: Location) => React.ReactNode;
}

const latLngToPercent = (lat: number, lng: number) => {
  // Costa Rica approx bounds: lat 8.0-11.0, lng -86.0 to -83.0, fitting coordinates to a 100x100 box
  const minLat = 8, maxLat = 11, minLng = -86, maxLng = -83;
  const x = ((lng - minLng) / (maxLng - minLng)) * 100; // left %
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100; // top % (invert Y)
  return { left: `${x}%`, top: `${y}%` };
};

const CostaRicaMap: React.FC<CostaRicaMapProps> = ({
  userPosition,
  planningAdventure,
  adventureWith,
  simulatedWazeUsers,
  filteredLocations,
  selectedLocation,
  handleLocationClick,
  renderSelectedLocationCard,
}) => {
  return (
    <div className="w-full h-60 rounded-lg relative mb-4 overflow-hidden border border-gray-200 shadow-md bg-costa-blue-light/20">
      {/* Static CR Map */}
      <img
        src={costaRicaMap}
        alt="Map of Costa Rica"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={e => {
          (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/8/8e/Costa_Rica_location_map_Topographic.png";
        }}
      />

      {/* User location dot */}
      {userPosition && (
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse"
          style={{
            ...latLngToPercent(userPosition.lat, userPosition.lng),
            boxShadow: planningAdventure || adventureWith ? '0 0 20px 5px #22c55e' : undefined,
          }}
          title="Your Position"
        >
          <div className={`w-8 h-8 rounded-full absolute -left-2 -top-2 ${planningAdventure || adventureWith ? "bg-green-500/60 animate-pulse" : "bg-blue-500 opacity-30"}`}></div>
          {planningAdventure || adventureWith ? (
            <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-xs bg-costa-green text-white px-2 py-0.5 rounded-full font-semibold shadow animate-fade-in">
              {adventureWith ? `With ${adventureWith}` : "Ready for adventure!"}
            </div>
          ) : null}
        </div>
      )}

      {/* Simulated Waze users */}
      {simulatedWazeUsers.map((wUser, i) => (
        <div
          key={wUser.id}
          className={`absolute flex flex-col items-center z-10 ${adventureWith === wUser.name ? "animate-pulse" : "animate-bounce"}`}
          style={{
            ...latLngToPercent(wUser.lat, wUser.lng),
            transition: 'top 2s, left 2s',
          }}
        >
          <img
            src={wUser.avatar}
            alt={wUser.name}
            className={`w-8 h-8 rounded-full border-2 ${adventureWith === wUser.name ? 'border-costa-blue' : 'border-costa-green'} shadow-xl bg-white`}
            title={wUser.name}
          />
          <span className={`text-xs px-2 py-0.5 rounded-full mt-1 shadow
            ${adventureWith === wUser.name ? "bg-costa-blue text-white font-semibold" : "bg-costa-green text-white"}`}>
            {wUser.name}{adventureWith === wUser.name && " 🎉"}
          </span>
        </div>
      ))}

      {/* Location pins */}
      {filteredLocations.map(location => (
        <div
          key={location.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
            selectedLocation === location.id ? 'z-10' : 'z-0'
          }`}
          style={{
            ...latLngToPercent(
              (location as any).lat ?? 10, // fallback lat if missing
              (location as any).lng ?? -84.5, // fallback lng if missing
            ),
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
          {/* Selected popup card runs as overlay */}
          {selectedLocation === location.id && renderSelectedLocationCard(location)}
        </div>
      ))}

      <div className="absolute bottom-2 right-2 bg-white p-1 rounded text-xs font-semibold pointer-events-none">
        Costa Rica
      </div>
    </div>
  );
};

export default CostaRicaMap;

