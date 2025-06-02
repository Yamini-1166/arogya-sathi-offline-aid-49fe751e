
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Plus, Bell } from 'lucide-react';

const AppointmentReminders = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const appointments = [
    {
      id: 1,
      patientName: 'Sita Devi',
      patientPhone: '+91 9876543210',
      type: 'Pregnancy Checkup',
      date: '2024-06-05',
      time: '10:00 AM',
      status: 'scheduled',
      priority: 'high',
      notes: 'Second trimester checkup'
    },
    {
      id: 2,
      patientName: 'Ram Kumar',
      patientPhone: '+91 9876543211',
      type: 'Diabetes Follow-up',
      date: '2024-06-06',
      time: '2:00 PM',
      status: 'confirmed',
      priority: 'medium',
      notes: 'Blood sugar monitoring'
    },
    {
      id: 3,
      patientName: 'Baby Meera',
      patientPhone: '+91 9876543212',
      type: 'Vaccination',
      date: '2024-06-07',
      time: '11:00 AM',
      status: 'pending',
      priority: 'high',
      notes: 'DPT booster shot'
    },
    {
      id: 4,
      patientName: 'Elderly Kumar',
      patientPhone: '+91 9876543213',
      type: 'Health Screening',
      date: '2024-06-08',
      time: '9:00 AM',
      status: 'scheduled',
      priority: 'low',
      notes: 'Annual health checkup'
    }
  ];

  const medicineReminders = [
    {
      id: 1,
      patientName: 'Ram Kumar',
      medicine: 'Metformin 500mg',
      dosage: 'Twice daily',
      nextDue: '2024-06-03 8:00 AM',
      status: 'due'
    },
    {
      id: 2,
      patientName: 'Sita Devi',
      medicine: 'Iron Tablets',
      dosage: 'Once daily',
      nextDue: '2024-06-03 7:00 PM',
      status: 'upcoming'
    },
    {
      id: 3,
      patientName: 'Radha Kumari',
      medicine: 'Blood Pressure Medicine',
      dosage: 'Morning',
      nextDue: '2024-06-04 7:00 AM',
      status: 'upcoming'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const AddAppointmentForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
        <CardDescription>Add a new appointment or reminder</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Patient Name" />
          <Input placeholder="Phone Number" />
          <select className="border rounded px-3 py-2">
            <option>Select Appointment Type</option>
            <option>General Checkup</option>
            <option>Pregnancy Checkup</option>
            <option>Vaccination</option>
            <option>Follow-up Visit</option>
            <option>Health Screening</option>
          </select>
          <Input type="date" />
          <Input type="time" />
          <select className="border rounded px-3 py-2">
            <option>Priority Level</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="mt-4">
          <Input placeholder="Additional notes..." />
        </div>
        <div className="flex space-x-2 mt-4">
          <Button onClick={() => setShowAddForm(false)}>Schedule Appointment</Button>
          <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment & Medicine Reminders</h2>
          <p className="text-gray-600">Manage patient appointments and medication schedules</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      {/* Add Appointment Form */}
      {showAddForm && <AddAppointmentForm />}

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {appointments.filter(apt => apt.date === '2024-06-05').length}
            </div>
            <div className="text-sm text-gray-600">Today's Appointments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter(apt => apt.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {medicineReminders.filter(med => med.status === 'due').length}
            </div>
            <div className="text-sm text-gray-600">Medicine Due</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Upcoming Appointments</span>
          </CardTitle>
          <CardDescription>Scheduled patient visits and checkups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className={`p-4 rounded-lg border ${getPriorityColor(appointment.priority)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(appointment.date).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{appointment.patientPhone}</span>
                  </div>
                </div>

                {appointment.notes && (
                  <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-100 rounded">
                    📝 {appointment.notes}
                  </p>
                )}

                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline">Confirm</Button>
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="outline">Call Patient</Button>
                  <Button size="sm" variant="outline">Send Reminder</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medicine Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Medicine Reminders</span>
          </CardTitle>
          <CardDescription>Track patient medication schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medicineReminders.map((reminder) => (
              <div key={reminder.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{reminder.patientName}</h4>
                    <p className="text-lg text-blue-600">{reminder.medicine}</p>
                  </div>
                  <Badge variant={reminder.status === 'due' ? 'destructive' : 'secondary'}>
                    {reminder.status === 'due' ? 'Due Now' : 'Upcoming'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Dosage: </span>
                    <span>{reminder.dosage}</span>
                  </div>
                  <div>
                    <span className="font-medium">Next Due: </span>
                    <span>{new Date(reminder.nextDue).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant={reminder.status === 'due' ? 'default' : 'outline'}>
                    Mark Taken
                  </Button>
                  <Button size="sm" variant="outline">Send Reminder</Button>
                  <Button size="sm" variant="outline">Edit Schedule</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Reminder Settings</CardTitle>
          <CardDescription>Configure how and when to send reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Appointment Reminders</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Send SMS reminder 1 day before</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Send SMS reminder 2 hours before</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className="text-sm">Call for high-priority appointments</span>
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Medicine Reminders</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Send daily medicine reminders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className="text-sm">Send weekly refill reminders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Alert for missed doses</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentReminders;
