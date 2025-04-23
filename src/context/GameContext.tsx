
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type BadgeType = {
  id: string;
  name: string;
  description: string;
  image: string;
  isUnlocked: boolean;
  unlockDate?: Date;
};

type Region = "Central Valley" | "Northern Plains" | "Caribbean Coast" | "Pacific Coast" | "Central Pacific";

type LocationType = {
  id: string;
  name: string;
  description: string;
  region: Region;
  coordinates: {
    lat: number;
    lng: number;
  };
  pointValue: number;
  type: "Historical" | "Cultural" | "Natural" | "Culinary" | "Adventure";
  visited: boolean;
  visitDate?: Date;
  image: string;
  activities: {
    id: string;
    name: string;
    description: string;
    pointValue: number;
    completed: boolean;
  }[];
};

type UserType = {
  name: string;
  avatar: string;
  level: number;
  points: number;
  achievements: BadgeType[];
  interests: string[];
  visitedLocations: number;
  completedActivities: number;
  joinDate: Date;
};

interface GameContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  locations: LocationType[];
  setLocations: React.Dispatch<React.SetStateAction<LocationType[]>>;
  badges: BadgeType[];
  setBadges: React.Dispatch<React.SetStateAction<BadgeType[]>>;
  selectedRegions: Region[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<Region[]>>;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  isOnboarded: boolean;
  setIsOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
  checkInLocation: (locationId: string) => void;
  completeActivity: (locationId: string, activityId: string) => void;
  visitLocation: (locationId: string) => void;
  checkForNewAchievements: () => void;
}

const defaultUser: UserType = {
  name: "Explorer",
  avatar: "/placeholder.svg",
  level: 1,
  points: 0,
  achievements: [],
  interests: [],
  visitedLocations: 0,
  completedActivities: 0,
  joinDate: new Date(),
};

const defaultBadges: BadgeType[] = [
  {
    id: "first-checkin",
    name: "¡Pura Vida!",
    description: "First check-in in Costa Rica",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "cultural-enthusiast",
    name: "Cultural Enthusiast",
    description: "Complete 5 cultural activities",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "nature-lover",
    name: "Nature Lover",
    description: "Visit 3 natural landmarks",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "foodie",
    name: "Costa Rican Foodie",
    description: "Try 3 local dishes",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "adventurer",
    name: "Adventure Seeker",
    description: "Complete 3 adventure activities",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "history-buff",
    name: "History Buff",
    description: "Visit 3 historical sites",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "region-explorer",
    name: "Region Explorer",
    description: "Visit locations in 3 different regions",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
  {
    id: "master-explorer",
    name: "Pura Vida Master Explorer",
    description: "Visit 10 locations in Costa Rica",
    image: "/placeholder.svg",
    isUnlocked: false,
  },
];

const defaultLocations: LocationType[] = [
  {
    id: "1",
    name: "La Fortuna Waterfall",
    description: "A stunning 75-meter waterfall in the northern lowlands of Costa Rica, near the Arenal Volcano.",
    region: "Northern Plains",
    coordinates: { lat: 10.4433, lng: -84.6731 },
    pointValue: 100,
    type: "Natural",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "1-1",
        name: "Waterfall Swim",
        description: "Take a refreshing swim in the natural pool beneath the waterfall.",
        pointValue: 50,
        completed: false,
      },
      {
        id: "1-2",
        name: "Hiking Photo",
        description: "Take a photo of yourself on the hiking trail.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "1-3",
        name: "Wildlife Observation",
        description: "Spot and photograph any unique wildlife along the way.",
        pointValue: 25,
        completed: false,
      },
      {
        id: "1-4",
        name: "Eco Cleanup",
        description: "Pick up any trash you find on your hike (and take a photo!).",
        pointValue: 20,
        completed: false,
      },
    ],
  },
  {
    id: "2",
    name: "National Theater of Costa Rica",
    description: "Historical landmark in San José known for its neoclassical architecture.",
    region: "Central Valley",
    coordinates: { lat: 9.9333, lng: -84.0833 },
    pointValue: 80,
    type: "Historical",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "2-1",
        name: "Architecture Tour",
        description: "Take a guided tour of the theater's architecture.",
        pointValue: 40,
        completed: false,
      },
      {
        id: "2-2",
        name: "Cultural Show",
        description: "Attend a cultural performance.",
        pointValue: 60,
        completed: false,
      },
      {
        id: "2-3",
        name: "History Selfie",
        description: "Take a selfie with the theater entrance.",
        pointValue: 10,
        completed: false,
      },
      {
        id: "2-4",
        name: "Opera Listen",
        description: "Listen to an opera or live musical piece in the main auditorium.",
        pointValue: 20,
        completed: false,
      },
    ],
  },
  {
    id: "3",
    name: "Manuel Antonio National Park",
    description: "Beautiful national park with beaches, hiking trails and diverse wildlife.",
    region: "Central Pacific",
    coordinates: { lat: 9.3921, lng: -84.1365 },
    pointValue: 120,
    type: "Natural",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "3-1",
        name: "Wildlife Spotting",
        description: "Photograph at least three different animal species.",
        pointValue: 70,
        completed: false,
      },
      {
        id: "3-2",
        name: "Beach Relaxation",
        description: "Relax at one of the park's pristine beaches.",
        pointValue: 40,
        completed: false,
      },
      {
        id: "3-3",
        name: "Jungle Sketch",
        description: "Sketch or doodle something you see in the jungle.",
        pointValue: 20,
        completed: false,
      },
      {
        id: "3-4",
        name: "Sunrise Photo",
        description: "Capture a sunrise or sunset from inside the park.",
        pointValue: 30,
        completed: false,
      },
    ],
  },
  {
    id: "4",
    name: "Mercado Central (Central Market)",
    description: "Traditional market in San José offering local foods, crafts and culture.",
    region: "Central Valley",
    coordinates: { lat: 9.9329, lng: -84.0795 },
    pointValue: 70,
    type: "Culinary",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "4-1",
        name: "Food Tasting",
        description: "Try a traditional Costa Rican dish like Gallo Pinto.",
        pointValue: 50,
        completed: false,
      },
      {
        id: "4-2",
        name: "Souvenir Shopping",
        description: "Purchase a handcrafted souvenir from a local vendor.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "4-3",
        name: "Spice Smell",
        description: "Find and smell 3 types of local spices and tell someone your favorite.",
        pointValue: 15,
        completed: false,
      },
      {
        id: "4-4",
        name: "Market Photo",
        description: "Take a vibrant photo of the market’s main aisle.",
        pointValue: 20,
        completed: false,
      },
    ],
  },
  {
    id: "5",
    name: "Monteverde Cloud Forest Reserve",
    description: "Lush cloud forest with incredible biodiversity and suspension bridges.",
    region: "Northern Plains",
    coordinates: { lat: 10.3010, lng: -84.8090 },
    pointValue: 110,
    type: "Adventure",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "5-1",
        name: "Canopy Tour",
        description: "Enjoy a zipline adventure through the cloud forest canopy.",
        pointValue: 80,
        completed: false,
      },
      {
        id: "5-2",
        name: "Birdwatching",
        description: "Spot the resplendent quetzal or other native birds.",
        pointValue: 60,
        completed: false,
      },
      {
        id: "5-3",
        name: "Bridge Crossing",
        description: "Walk all the suspension bridges and take a selfie on one.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "5-4",
        name: "Cloud Mist Photo",
        description: "Take a photo in the famous Monteverde clouds.",
        pointValue: 20,
        completed: false,
      },
    ],
  },
  {
    id: "6",
    name: "Tortuguero National Park",
    description: "Remote national park known for sea turtle nesting and canal networks.",
    region: "Caribbean Coast",
    coordinates: { lat: 10.5431, lng: -83.5050 },
    pointValue: 130,
    type: "Natural",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "6-1",
        name: "Canal Boat Tour",
        description: "Take a boat tour through the park's canals.",
        pointValue: 70,
        completed: false,
      },
      {
        id: "6-2",
        name: "Turtle Watching",
        description: "Watch sea turtles nesting (seasonal).",
        pointValue: 90,
        completed: false,
      },
      {
        id: "6-3",
        name: "Jungle Sound Recording",
        description: "Record unique jungle sounds for 30 seconds.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "6-4",
        name: "Guide Interview",
        description: "Interview a local guide and write a sentence about what you learned.",
        pointValue: 20,
        completed: false,
      },
    ],
  },
  // Add even more categories/areas (examples):
  {
    id: "7",
    name: "Puerto Viejo de Talamanca",
    description: "A laid-back Caribbean beach town famous for surfing and Afro-Caribbean culture.",
    region: "Caribbean Coast",
    coordinates: { lat: 9.6566, lng: -82.7547 },
    pointValue: 90,
    type: "Adventure",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "7-1",
        name: "Surf Challenge",
        description: "Take a surf lesson or paddle out on the waves.",
        pointValue: 60,
        completed: false,
      },
      {
        id: "7-2",
        name: "Cultural Music Night",
        description: "Attend a local reggae or Calypso music night.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "7-3",
        name: "Smoothie Stand",
        description: "Find and try a tropical fruit smoothie from a street vendor.",
        pointValue: 10,
        completed: false,
      },
    ],
  },
  {
    id: "8",
    name: "Orosi Valley",
    description: "Scenic valley with hot springs, coffee plantations, and volcanic views.",
    region: "Central Valley",
    coordinates: { lat: 9.8067, lng: -83.8555 },
    pointValue: 75,
    type: "Natural",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "8-1",
        name: "Hot Spring Relaxation",
        description: "Soak in the valley’s natural hot springs.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "8-2",
        name: "Coffee Tour",
        description: "Take a tour of a local coffee plantation and taste a fresh brew.",
        pointValue: 30,
        completed: false,
      },
      {
        id: "8-3",
        name: "Valley Sunrise Photo",
        description: "Capture a sunrise photo from a lookout.",
        pointValue: 15,
        completed: false,
      },
    ],
  },
  {
    id: "9",
    name: "Jacó Beach",
    description: "Popular Pacific coast town known for surfing, outdoor activities, and nightlife.",
    region: "Pacific Coast",
    coordinates: { lat: 9.6156, lng: -84.6270 },
    pointValue: 80,
    type: "Culinary",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "9-1",
        name: "Sunset Dinner",
        description: "Enjoy dinner at a beachfront restaurant during sunset.",
        pointValue: 40,
        completed: false,
      },
      {
        id: "9-2",
        name: "Oceanside Walk",
        description: "Take a walk or bike ride along the Jacó promenade.",
        pointValue: 25,
        completed: false,
      },
      {
        id: "9-3",
        name: "Live Music Night",
        description: "Attend a live music evening at a local bar/café.",
        pointValue: 15,
        completed: false,
      },
    ],
  },
  {
    id: "10",
    name: "Santa Teresa",
    description: "Trendy beach destination on the Nicoya Peninsula, ideal for relaxation and surfing.",
    region: "Pacific Coast",
    coordinates: { lat: 9.6540, lng: -85.1590 },
    pointValue: 100,
    type: "Adventure",
    visited: false,
    image: "/placeholder.svg",
    activities: [
      {
        id: "10-1",
        name: "Yoga on the Beach",
        description: "Join a group yoga session on the sand.",
        pointValue: 40,
        completed: false,
      },
      {
        id: "10-2",
        name: "Sunset Bonfire",
        description: "Attend or organize a sunset bonfire gathering.",
        pointValue: 25,
        completed: false,
      },
      {
        id: "10-3",
        name: "Tide Pool Discovery",
        description: "Find and photograph sea life in a tide pool.",
        pointValue: 15,
        completed: false,
      },
      {
        id: "10-4",
        name: "Beach Clean Up",
        description: "Spend 10 minutes picking up litter and take a selfie afterward.",
        pointValue: 20,
        completed: false,
      },
    ],
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : defaultUser;
  });
  
  const [locations, setLocations] = useState<LocationType[]>(() => {
    const saved = localStorage.getItem('locations');
    return saved ? JSON.parse(saved) : defaultLocations;
  });
  
  const [badges, setBadges] = useState<BadgeType[]>(() => {
    const saved = localStorage.getItem('badges');
    return saved ? JSON.parse(saved) : defaultBadges;
  });
  
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('isOnboarded') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('isOnboarded', String(isOnboarded));
  }, [isOnboarded]);

  const checkInLocation = (locationId: string) => {
    setLocations(prevLocations => {
      return prevLocations.map(location => {
        if (location.id === locationId && !location.visited) {
          const updatedLocation = {
            ...location,
            visited: true,
            visitDate: new Date()
          };
          
          // Update user stats and points
          setUser(prevUser => ({
            ...prevUser,
            points: prevUser.points + location.pointValue,
            visitedLocations: prevUser.visitedLocations + 1,
          }));
          
          // Show toast for points earned
          toast.success(`+${location.pointValue} points!`, {
            description: `You checked in at ${location.name}`,
          });
          
          return updatedLocation;
        }
        return location;
      });
    });
    
    // Check for new achievements after check-in
    checkForNewAchievements();
  };

  const completeActivity = (locationId: string, activityId: string) => {
    setLocations(prevLocations => {
      return prevLocations.map(location => {
        if (location.id === locationId) {
          const updatedActivities = location.activities.map(activity => {
            if (activity.id === activityId && !activity.completed) {
              // Update user stats and points
              setUser(prevUser => ({
                ...prevUser,
                points: prevUser.points + activity.pointValue,
                completedActivities: prevUser.completedActivities + 1,
              }));
              
              // Show toast for points earned
              toast.success(`+${activity.pointValue} points!`, {
                description: `Activity completed: ${activity.name}`,
              });
              
              return { ...activity, completed: true };
            }
            return activity;
          });
          
          return { ...location, activities: updatedActivities };
        }
        return location;
      });
    });
    
    // Check for new achievements after completing activity
    checkForNewAchievements();
  };

  const visitLocation = (locationId: string) => {
    checkInLocation(locationId);
  };

  const checkForNewAchievements = () => {
    const updatedBadges = [...badges];
    let newAchievements = false;

    // Calculate stats for badge checks
    const visitedLocations = locations.filter(l => l.visited).length;
    const completedActivities = locations.reduce((total, loc) => 
      total + loc.activities.filter(a => a.completed).length, 0);
    
    const culturalActivitiesCount = locations.filter(l => l.type === "Cultural" && l.visited).length;
    const naturalLocationsCount = locations.filter(l => l.type === "Natural" && l.visited).length;
    const culinaryLocationsCount = locations.filter(l => l.type === "Culinary" && l.visited).length;
    const adventureLocationsCount = locations.filter(l => l.type === "Adventure" && l.visited).length;
    const historicalLocationsCount = locations.filter(l => l.type === "Historical" && l.visited).length;
    
    // Count unique visited regions
    const visitedRegions = new Set(locations.filter(l => l.visited).map(l => l.region)).size;

    // Check each badge
    updatedBadges.forEach((badge, index) => {
      if (badge.isUnlocked) return;

      let shouldUnlock = false;

      switch(badge.id) {
        case "first-checkin":
          shouldUnlock = visitedLocations > 0;
          break;
        case "cultural-enthusiast":
          shouldUnlock = culturalActivitiesCount >= 5;
          break;
        case "nature-lover":
          shouldUnlock = naturalLocationsCount >= 3;
          break;
        case "foodie":
          shouldUnlock = culinaryLocationsCount >= 3;
          break;
        case "adventurer":
          shouldUnlock = adventureLocationsCount >= 3;
          break;
        case "history-buff":
          shouldUnlock = historicalLocationsCount >= 3;
          break;
        case "region-explorer":
          shouldUnlock = visitedRegions >= 3;
          break;
        case "master-explorer":
          shouldUnlock = visitedLocations >= 10;
          break;
      }

      if (shouldUnlock) {
        updatedBadges[index] = {
          ...badge,
          isUnlocked: true,
          unlockDate: new Date()
        };
        newAchievements = true;
        
        // Award bonus points for achievement
        setUser(prevUser => ({
          ...prevUser,
          points: prevUser.points + 100,
          achievements: [...prevUser.achievements, updatedBadges[index]]
        }));

        // Show achievement toast
        toast("Achievement Unlocked!", {
          description: `${badge.name}: ${badge.description}`,
          duration: 5000,
        });
      }
    });

    if (newAchievements) {
      setBadges(updatedBadges);
      
      // Update user level based on points
      updateUserLevel();
    }
  };

  const updateUserLevel = () => {
    setUser(prevUser => {
      const newLevel = Math.floor(prevUser.points / 500) + 1;
      if (newLevel > prevUser.level) {
        toast("Level Up!", {
          description: `You've reached level ${newLevel}!`,
          duration: 5000,
        });
        return { ...prevUser, level: newLevel };
      }
      return prevUser;
    });
  };

  return (
    <GameContext.Provider
      value={{
        user,
        setUser,
        locations,
        setLocations,
        badges,
        setBadges,
        selectedRegions,
        setSelectedRegions,
        selectedTypes,
        setSelectedTypes,
        isOnboarded,
        setIsOnboarded,
        checkInLocation,
        completeActivity,
        visitLocation,
        checkForNewAchievements,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
