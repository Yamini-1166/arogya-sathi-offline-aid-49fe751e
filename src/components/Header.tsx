
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Globe, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  isOffline: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, setCurrentLanguage, isOffline }) => {
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' }
  ];

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/patients', label: 'Patients', icon: '👥' },
    { path: '/first-aid', label: 'First Aid', icon: '🩹' },
    { path: '/education', label: 'Education', icon: '📚' },
    { path: '/emergency', label: 'Emergency', icon: '🚨' },
    { path: '/appointments', label: 'Appointments', icon: '📅' }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-green-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">Grama Arogya Sathi</h1>
              <p className="text-sm text-gray-600">ग्राम आरोग्य साथी</p>
            </div>
          </div>

          {/* Connection Status and Language Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isOffline ? (
                <WifiOff className="h-5 w-5 text-red-500" />
              ) : (
                <Wifi className="h-5 w-5 text-green-500" />
              )}
              <span className={`text-sm ${isOffline ? 'text-red-500' : 'text-green-500'}`}>
                {isOffline ? 'Offline Mode' : 'Online'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200">
          <div className="flex overflow-x-auto py-2 space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className="whitespace-nowrap flex items-center space-x-2"
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
