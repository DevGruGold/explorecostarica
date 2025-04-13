
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from 'sonner';
import { useEffect } from 'react';

import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import PlanAdventure from "./pages/PlanAdventure";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Quest from "./pages/Quest";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { GameProvider } from "./context/GameContext";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Show welcome toast when app is opened
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        toast("¡Bienvenidos a Costa Rica!", {
          description: "Remember to turn on airplane mode to avoid roaming charges. Use free WiFi at destinations to update progress!",
          duration: 6000,
        });
        localStorage.setItem('hasVisited', 'true');
      }, 2000);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GameProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route element={<Layout />}>
                <Route path="/plan" element={<PlanAdventure />} />
                <Route path="/map" element={<Map />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quest/:id" element={<Quest />} />
                <Route path="/achievements" element={<Achievements />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
