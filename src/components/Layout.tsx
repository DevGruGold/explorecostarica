
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background leaf-pattern">
      <main className="flex-1 container mx-auto p-4 pb-20">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
