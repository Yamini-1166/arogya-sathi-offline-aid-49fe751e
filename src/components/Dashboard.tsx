
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
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 sm:p-6 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome, ASHA Worker!</h2>
        <p className="text-green-100 mb-3 sm:mb-4 text-sm sm:text-base">
          Ready to serve your community today. Here's your daily overview.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
          <span>📍 Primary Health Center - Gram Panchayat</span>
          <span>📅 {new Date().toLocaleDateString('en-IN')}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2 sm:p-3 rounded-full flex-shrink-0 ml-2`}>
                  <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="block">
              <Card className={`cursor-pointer transition-all duration-200 ${action.color} h-full hover:shadow-lg`}>
                <CardHeader className="text-center pb-2 p-3 sm:p-6">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">{action.icon}</div>
                  <CardTitle className="text-sm sm:text-lg leading-tight">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0">
                  <CardDescription className="text-xs sm:text-sm">{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity and Health Tips */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{activity.type}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.name}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
                    <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
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
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Daily Health Tip</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Hand Hygiene Awareness</h4>
              <p className="text-xs sm:text-sm text-gray-700 mb-3">
                Regular handwashing with soap for 20 seconds can prevent 80% of infectious diseases. 
                Promote this simple practice in your community.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button size="sm" variant="outline" className="text-xs sm:text-sm">Share Tip</Button>
                <Button size="sm" variant="outline" className="text-xs sm:text-sm">More Tips</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
