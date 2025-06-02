
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import PatientTracker from '../components/PatientTracker';
import FirstAidGuide from '../components/FirstAidGuide';
import HealthEducation from '../components/HealthEducation';
import EmergencyPanel from '../components/EmergencyPanel';
import AppointmentReminders from '../components/AppointmentReminders';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
        isOffline={isOffline}
      />
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-7xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientTracker />} />
          <Route path="/first-aid" element={<FirstAidGuide />} />
          <Route path="/education" element={<HealthEducation />} />
          <Route path="/emergency" element={<EmergencyPanel />} />
          <Route path="/appointments" element={<AppointmentReminders />} />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
