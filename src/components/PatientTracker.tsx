
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Calendar, Phone } from 'lucide-react';

const PatientTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const patients = [
    {
      id: 1,
      name: 'Sita Devi',
      age: 32,
      gender: 'Female',
      phone: '+91 9876543210',
      lastVisit: '2024-05-30',
      condition: 'Pregnancy Checkup',
      status: 'Active',
      village: 'Rampur'
    },
    {
      id: 2,
      name: 'Ram Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91 9876543211',
      lastVisit: '2024-05-28',
      condition: 'Diabetes',
      status: 'Follow-up',
      village: 'Shyampur'
    },
    {
      id: 3,
      name: 'Meera Sharma',
      age: 28,
      gender: 'Female',
      phone: '+91 9876543212',
      lastVisit: '2024-05-25',
      condition: 'Vaccination',
      status: 'Completed',
      village: 'Rampur'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddPatientForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Patient</CardTitle>
        <CardDescription>Register a new patient in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Full Name" />
          <Input placeholder="Age" type="number" />
          <select className="border rounded px-3 py-2">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <Input placeholder="Phone Number" />
          <Input placeholder="Village/Area" />
          <Input placeholder="Primary Condition" />
        </div>
        <div className="flex space-x-2 mt-4">
          <Button onClick={() => setShowAddForm(false)}>Save Patient</Button>
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
          <h2 className="text-2xl font-bold text-gray-900">Patient Tracker</h2>
          <p className="text-gray-600">Manage and track patient information</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Add Patient Form */}
      {showAddForm && <AddPatientForm />}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, village, or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select className="border rounded px-3 py-2">
                <option>All Villages</option>
                <option>Rampur</option>
                <option>Shyampur</option>
              </select>
              <select className="border rounded px-3 py-2">
                <option>All Status</option>
                <option>Active</option>
                <option>Follow-up</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <CardDescription>
                    {patient.age} years • {patient.gender} • {patient.village}
                  </CardDescription>
                </div>
                <Badge variant={
                  patient.status === 'Active' ? 'default' :
                  patient.status === 'Follow-up' ? 'secondary' : 'outline'
                }>
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>{patient.condition}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Last visit: {new Date(patient.lastVisit).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="outline">Add Visit</Button>
                <Button size="sm" variant="outline">Call</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {patients.filter(p => p.status === 'Follow-up').length}
            </div>
            <div className="text-sm text-gray-600">Follow-ups Needed</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientTracker;
