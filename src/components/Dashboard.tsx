
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, BookOpen, Phone, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: '245', icon: Users, color: 'bg-blue-500' },
    { title: 'Today\'s Checkups', value: '12', icon: Heart, color: 'bg-green-500' },
    { title: 'Upcoming Appointments', value: '8', icon: Calendar, color: 'bg-orange-500' },
    { title: 'Emergency Contacts', value: '15', icon: Phone, color: 'bg-red-500' }
  ];

  const quickActions = [
    {
      title: 'Add New Patient',
      description: 'Register a new patient in the system',
      icon: '👤',
      link: '/patients',
      color: 'border-blue-200 hover:border-blue-400'
    },
    {
      title: 'Emergency First Aid',
      description: 'Quick access to first aid procedures',
      icon: '🩹',
      link: '/first-aid',
      color: 'border-red-200 hover:border-red-400'
    },
    {
      title: 'Health Education',
      description: 'Educational materials and resources',
      icon: '📚',
      link: '/education',
      color: 'border-green-200 hover:border-green-400'
    },
    {
      title: 'Schedule Appointment',
      description: 'Book or manage appointments',
      icon: '📅',
      link: '/appointments',
      color: 'border-purple-200 hover:border-purple-400'
    }
  ];

  const recentActivity = [
    { type: 'Patient Visit', name: 'Sita Devi', time: '2 hours ago', status: 'completed' },
    { type: 'Vaccination', name: 'Ram Kumar', time: '4 hours ago', status: 'scheduled' },
    { type: 'Health Check', name: 'Meera Sharma', time: '1 day ago', status: 'completed' },
    { type: 'Emergency Call', name: 'Village Center', time: '2 days ago', status: 'resolved' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome, ASHA Worker!</h2>
        <p className="text-green-100 mb-4">
          Ready to serve your community today. Here's your daily overview.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <span>📍 Primary Health Center - Gram Panchayat</span>
          <span>📅 {new Date().toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className={`cursor-pointer transition-all duration-200 ${action.color} h-full`}>
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{action.icon}</div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity and Health Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.type}</p>
                    <p className="text-sm text-gray-600">{activity.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Daily Health Tip</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Hand Hygiene Awareness</h4>
              <p className="text-sm text-gray-700 mb-3">
                Regular handwashing with soap for 20 seconds can prevent 80% of infectious diseases. 
                Promote this simple practice in your community.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Share Tip</Button>
                <Button size="sm" variant="outline">More Tips</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
