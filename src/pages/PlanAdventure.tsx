
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useGame } from '@/context/GameContext';
import { Map, Mountain, UtensilsCrossed, History, Palmtree } from 'lucide-react';

const PlanAdventure = () => {
  const navigate = useNavigate();
  const { 
    locations, 
    user, 
    selectedRegions, 
    setSelectedRegions,
    selectedTypes,
    setSelectedTypes 
  } = useGame();

  const [days, setDays] = useState('3');
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const handleRegionToggle = (region: string) => {
    setRegionFilter(current => 
      current.includes(region)
        ? current.filter(r => r !== region)
        : [...current, region]
    );
  };

  const handleTypeToggle = (type: string) => {
    setTypeFilter(current => 
      current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type]
    );
  };

  const createItinerary = () => {
    // Save filters to context
    setSelectedRegions(regionFilter as any);
    setSelectedTypes(typeFilter);

    // Show success toast
    toast.success("Adventure planned!", {
      description: `Your ${days}-day adventure is ready to explore.`,
    });

    // Navigate to the map
    navigate('/map');
  };

  const regionOptions = Array.from(new Set(locations.map(loc => loc.region)));
  const typeOptions = Array.from(new Set(locations.map(loc => loc.type)));

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Cultural': return <Palmtree className="mr-2 h-4 w-4" />;
      case 'Natural': return <Mountain className="mr-2 h-4 w-4" />;
      case 'Historical': return <History className="mr-2 h-4 w-4" />;
      case 'Culinary': return <UtensilsCrossed className="mr-2 h-4 w-4" />;
      default: return <Map className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-costa-green">Plan Your Adventure</h1>
        <p className="text-gray-600">Customize your Costa Rican experience, {user.name}!</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trip Duration</CardTitle>
          <CardDescription>How many days will you spend exploring?</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger>
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 day</SelectItem>
              <SelectItem value="2">2 days</SelectItem>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="5">5 days</SelectItem>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="10">10 days</SelectItem>
              <SelectItem value="14">14 days</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Regions</CardTitle>
          <CardDescription>Select regions you'd like to explore</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {regionOptions.map(region => (
              <div 
                key={region} 
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  regionFilter.includes(region) 
                    ? 'border-costa-green bg-costa-green/10' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleRegionToggle(region)}
              >
                <div className="flex items-center">
                  <Checkbox 
                    id={`region-${region}`}
                    checked={regionFilter.includes(region)}
                    onCheckedChange={() => handleRegionToggle(region)}
                    className="mr-2"
                  />
                  <Label htmlFor={`region-${region}`} className="cursor-pointer">
                    {region}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Experience Types</CardTitle>
          <CardDescription>What types of activities interest you?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {typeOptions.map(type => (
              <div 
                key={type} 
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  typeFilter.includes(type) 
                    ? 'border-costa-green bg-costa-green/10' 
                    : 'border-gray-200'
                }`}
                onClick={() => handleTypeToggle(type)}
              >
                <div className="flex items-center">
                  <Checkbox 
                    id={`type-${type}`}
                    checked={typeFilter.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                    className="mr-2"
                  />
                  <Label htmlFor={`type-${type}`} className="cursor-pointer flex items-center">
                    {getTypeIcon(type)}
                    {type}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={createItinerary} 
        className="w-full bg-costa-green hover:bg-costa-green-dark"
      >
        Create My Adventure
      </Button>
    </div>
  );
};

export default PlanAdventure;
