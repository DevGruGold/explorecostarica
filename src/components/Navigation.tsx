
import { Link, useLocation } from 'react-router-dom';
import { MapPin, User, Award, Map as MapIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/map"
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2 text-sm font-medium transition-colors",
            isActive('/map') 
              ? "text-costa-green" 
              : "text-gray-500 hover:text-costa-green"
          )}
        >
          <MapPin size={24} />
          <span>Explore</span>
        </Link>
        
        <Link
          to="/plan"
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2 text-sm font-medium transition-colors",
            isActive('/plan') 
              ? "text-costa-green" 
              : "text-gray-500 hover:text-costa-green"
          )}
        >
          <MapIcon size={24} />
          <span>Plan</span>
        </Link>
        
        <Link
          to="/achievements"
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2 text-sm font-medium transition-colors",
            isActive('/achievements') 
              ? "text-costa-green" 
              : "text-gray-500 hover:text-costa-green"
          )}
        >
          <Award size={24} />
          <span>Badges</span>
        </Link>
        
        <Link
          to="/profile"
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2 text-sm font-medium transition-colors",
            isActive('/profile') 
              ? "text-costa-green" 
              : "text-gray-500 hover:text-costa-green"
          )}
        >
          <User size={24} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
