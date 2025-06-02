
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Clock, AlertTriangle, Hospital, Ambulance } from 'lucide-react';

const EmergencyPanel = () => {
  const [emergencyType, setEmergencyType] = useState('');

  const emergencyContacts = [
    {
      name: 'Emergency Ambulance',
      number: '108',
      type: 'ambulance',
      description: 'Free emergency ambulance service',
      available: '24/7',
      icon: Ambulance
    },
    {
      name: 'Primary Health Center',
      number: '+91 9876543200',
      type: 'hospital',
      description: 'Nearest PHC - Gram Panchayat',
      available: '24/7',
      distance: '2.5 km',
      icon: Hospital
    },
    {
      name: 'District Hospital',
      number: '+91 9876543201',
      type: 'hospital',
      description: 'District Hospital - Main City',
      available: '24/7',
      distance: '15 km',
      icon: Hospital
    },
    {
      name: 'Police Station',
      number: '100',
      type: 'police',
      description: 'Local police station',
      available: '24/7',
      distance: '3 km',
      icon: Phone
    },
    {
      name: 'Fire Brigade',
      number: '101',
      type: 'fire',
      description: 'Fire emergency services',
      available: '24/7',
      icon: Phone
    },
    {
      name: 'Block Medical Officer',
      number: '+91 9876543202',
      type: 'medical',
      description: 'Dr. Priya Sharma - BMO',
      available: '9 AM - 6 PM',
      icon: Phone
    }
  ];

  const emergencyTypes = [
    {
      type: 'cardiac',
      title: 'Heart Attack / Cardiac Emergency',
      icon: '❤️',
      color: 'border-red-500 bg-red-50',
      actions: ['Call 108 immediately', 'Keep patient calm and sitting', 'Loosen tight clothing', 'Give aspirin if available']
    },
    {
      type: 'accident',
      title: 'Road Accident / Trauma',
      icon: '🚗',
      color: 'border-orange-500 bg-orange-50',
      actions: ['Call 108 and 100', 'Do not move injured person', 'Control bleeding with pressure', 'Keep airway clear']
    },
    {
      type: 'poisoning',
      title: 'Poisoning / Overdose',
      icon: '☠️',
      color: 'border-purple-500 bg-purple-50',
      actions: ['Call 108 immediately', 'Do not induce vomiting', 'Keep container/substance', 'Monitor breathing']
    },
    {
      type: 'breathing',
      title: 'Breathing Difficulty / Asthma',
      icon: '🫁',
      color: 'border-blue-500 bg-blue-50',
      actions: ['Call 108 if severe', 'Help patient sit upright', 'Use inhaler if available', 'Stay calm and reassuring']
    },
    {
      type: 'seizure',
      title: 'Seizure / Convulsions',
      icon: '🧠',
      color: 'border-indigo-500 bg-indigo-50',
      actions: ['Call 108 if first seizure', 'Clear area around patient', 'Time the seizure', 'Do not restrain patient']
    },
    {
      type: 'snake',
      title: 'Snake Bite',
      icon: '🐍',
      color: 'border-green-500 bg-green-50',
      actions: ['Call 108 immediately', 'Keep patient still', 'Remove jewelry', 'Mark swelling progression']
    }
  ];

  const quickActions = [
    {
      title: 'Call Ambulance',
      subtitle: 'Emergency: 108',
      action: () => window.open('tel:108'),
      color: 'bg-red-500 hover:bg-red-600',
      icon: '🚑'
    },
    {
      title: 'Nearest Hospital',
      subtitle: 'Get Directions',
      action: () => window.open('https://maps.google.com/?q=nearest+hospital'),
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '🏥'
    },
    {
      title: 'Police Help',
      subtitle: 'Emergency: 100',
      action: () => window.open('tel:100'),
      color: 'bg-gray-600 hover:bg-gray-700',
      icon: '👮'
    },
    {
      title: 'Fire Emergency',
      subtitle: 'Emergency: 101',
      action: () => window.open('tel:101'),
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: '🔥'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Emergency Response Panel</h2>
        <p className="text-red-100 mb-4">
          Quick access to emergency contacts and life-saving procedures
        </p>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm">In case of emergency, stay calm and follow the procedures</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.action}
            className={`h-20 flex flex-col items-center justify-center text-white ${action.color}`}
          >
            <span className="text-2xl mb-1">{action.icon}</span>
            <div className="text-center">
              <div className="font-semibold text-sm">{action.title}</div>
              <div className="text-xs opacity-90">{action.subtitle}</div>
            </div>
          </Button>
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Emergency Contacts</span>
          </CardTitle>
          <CardDescription>Important phone numbers for emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <contact.icon className="h-5 w-5 text-gray-600" />
                    <h4 className="font-semibold">{contact.name}</h4>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open(`tel:${contact.number}`)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Call
                  </Button>
                </div>
                <p className="text-lg font-mono text-blue-600 mb-1">{contact.number}</p>
                <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{contact.available}</span>
                  </div>
                  {contact.distance && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{contact.distance}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Procedures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Emergency Procedures</span>
          </CardTitle>
          <CardDescription>Quick reference for common emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyTypes.map((emergency, index) => (
              <Card key={index} className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${emergency.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{emergency.icon}</span>
                    <CardTitle className="text-lg">{emergency.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm">Immediate Actions:</h5>
                    <ul className="text-sm space-y-1">
                      {emergency.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start space-x-2">
                          <span className="text-blue-600 font-bold text-xs mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Location Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Share Your Location</h4>
              <p className="text-sm text-gray-600 mb-3">
                Send your current location to emergency services for faster response
              </p>
              <Button size="sm" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2">Nearest Facilities</h4>
              <p className="text-sm text-gray-600 mb-3">
                Find hospitals, clinics, and pharmacies near your location
              </p>
              <Button size="sm" variant="outline">
                <Hospital className="h-4 w-4 mr-2" />
                Find Nearby
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyPanel;
