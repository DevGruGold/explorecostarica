
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationProps {
  location: {
    id: string;
    name: string;
    description: string;
    region: string;
    pointValue: number;
    type: string;
    visited: boolean;
    image: string;
  };
  onCheckIn: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const LocationCard: React.FC<LocationProps> = ({ location, onCheckIn, onViewDetails }) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md",
      location.visited ? "border-costa-earth-clay/20" : ""
    )}>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 h-32">
          <div className="col-span-1 bg-gray-100 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-costa-green/20 to-costa-blue/20 flex items-center justify-center">
              {location.type === 'Natural' && "🏞️"}
              {location.type === 'Cultural' && "🎭"}
              {location.type === 'Historical' && "🏛️"}
              {location.type === 'Culinary' && "🍽️"}
              {location.type === 'Adventure' && "🧗‍♀️"}
            </div>
            <div className="absolute top-2 left-2">
              {location.visited && (
                <Badge className="bg-costa-earth-clay">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Visited
                </Badge>
              )}
            </div>
          </div>

          <div className="col-span-2 p-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm line-clamp-1">{location.name}</h3>
                <span className="text-xs font-bold text-costa-green">{location.pointValue} pts</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <MapPin size={12} className="mr-1" /> {location.region}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{location.description}</p>
            </div>

            <div className="flex mt-2 gap-2">
              <Button 
                variant={location.visited ? "outline" : "default"}
                size="sm" 
                className={cn(
                  "flex-1 text-xs py-1", 
                  location.visited 
                    ? "border-costa-earth-clay text-costa-earth-clay" 
                    : "bg-costa-green hover:bg-costa-green-dark"
                )}
                onClick={() => onCheckIn(location.id)}
                disabled={location.visited}
              >
                {location.visited ? 'Visited' : 'Check In'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs py-1"
                onClick={() => onViewDetails(location.id)}
              >
                Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
