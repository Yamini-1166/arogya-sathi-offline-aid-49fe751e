
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Clock, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FirstAidGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);

  const firstAidGuides = [
    {
      id: 1,
      title: 'CPR (Cardiopulmonary Resuscitation)',
      category: 'Critical',
      duration: '5-10 minutes',
      difficulty: 'Advanced',
      description: 'Life-saving technique for cardiac arrest',
      steps: [
        'Check for responsiveness - tap shoulders and shout',
        'Call for help immediately - dial 108',
        'Position patient on firm surface, tilt head back',
        'Place heel of hand on center of chest',
        'Push hard and fast - 100-120 compressions per minute',
        'Give 30 compressions, then 2 rescue breaths',
        'Continue until help arrives'
      ],
      warnings: ['Only perform if trained', 'Can cause rib fractures', 'Continue until professional help arrives']
    },
    {
      id: 2,
      title: 'Severe Bleeding Control',
      category: 'Emergency',
      duration: '2-5 minutes',
      difficulty: 'Beginner',
      description: 'Stop heavy bleeding and prevent shock',
      steps: [
        'Ensure your safety first',
        'Apply direct pressure with clean cloth',
        'Elevate the injured area if possible',
        'Do not remove embedded objects',
        'Apply pressure bandage over wound',
        'Monitor for signs of shock',
        'Seek immediate medical attention'
      ],
      warnings: ['Do not remove deeply embedded objects', 'Watch for signs of shock', 'Maintain pressure continuously']
    },
    {
      id: 3,
      title: 'High Fever Management',
      category: 'Common',
      duration: '10-15 minutes',
      difficulty: 'Beginner',
      description: 'Reduce fever and prevent complications',
      steps: [
        'Remove excess clothing',
        'Apply cool, damp cloth to forehead',
        'Give plenty of fluids',
        'Use paracetamol as per age/weight',
        'Monitor temperature every 30 minutes',
        'Seek medical help if fever > 104°F',
        'Watch for signs of dehydration'
      ],
      warnings: ['Never use ice baths', 'Do not give aspirin to children', 'Monitor breathing closely']
    },
    {
      id: 4,
      title: 'Burns Treatment',
      category: 'Emergency',
      duration: '3-7 minutes',
      difficulty: 'Intermediate',
      description: 'First aid for thermal burns',
      steps: [
        'Remove from heat source safely',
        'Cool burn with running water for 10-20 minutes',
        'Remove jewelry before swelling',
        'Cover with sterile, non-stick dressing',
        'Do not break blisters',
        'Give pain medication if available',
        'Seek medical attention for severe burns'
      ],
      warnings: ['Do not use ice', 'Avoid butter or oil', 'Do not break blisters']
    },
    {
      id: 5,
      title: 'Choking Relief',
      category: 'Critical',
      duration: '1-3 minutes',
      difficulty: 'Intermediate',
      description: 'Help someone who is choking',
      steps: [
        'Ask "Are you choking?" - if they can\'t speak, act quickly',
        'Give 5 back blows between shoulder blades',
        'If unsuccessful, perform abdominal thrusts',
        'Place hands above navel, thrust upward',
        'Alternate 5 back blows and 5 abdominal thrusts',
        'Continue until object is expelled or person becomes unconscious',
        'If unconscious, start CPR'
      ],
      warnings: ['Different technique for infants', 'Be careful with pregnant women', 'Seek medical check after incident']
    },
    {
      id: 6,
      title: 'Snake Bite Management',
      category: 'Emergency',
      duration: '5-10 minutes',
      difficulty: 'Intermediate',
      description: 'Immediate care for snake bites',
      steps: [
        'Keep victim calm and still',
        'Remove jewelry from affected limb',
        'Keep bitten area below heart level',
        'Clean wound gently with water',
        'Cover with loose, sterile bandage',
        'Mark edge of swelling with pen/marker',
        'Rush to nearest hospital immediately'
      ],
      warnings: ['Do not cut the wound', 'Do not suck out venom', 'Do not apply ice', 'Do not use tourniquet']
    }
  ];

  const categories = ['All', 'Critical', 'Emergency', 'Common'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGuides = firstAidGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Critical': return 'bg-red-500';
      case 'Emergency': return 'bg-orange-500';
      case 'Common': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const GuideDetail = ({ guide }) => (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{guide.title}</CardTitle>
            <CardDescription>{guide.description}</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setSelectedGuide(null)}>
            ← Back
          </Button>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{guide.duration}</span>
          </div>
          <Badge variant="outline">{guide.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Warnings */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="font-semibold text-red-800">Important Warnings</h4>
            </div>
            <ul className="list-disc list-inside space-y-1 text-red-700">
              {guide.warnings.map((warning, index) => (
                <li key={index} className="text-sm">{warning}</li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Step-by-Step Instructions</h4>
            <div className="space-y-3">
              {guide.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Audio Guide</span>
            </Button>
            <Button variant="outline">Print Instructions</Button>
            <Button variant="outline">Share</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedGuide) {
    return (
      <div className="space-y-6">
        <GuideDetail guide={selectedGuide} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">First Aid Guide</h2>
        <p className="text-gray-600">Emergency medical procedures and life-saving techniques</p>
      </div>

      {/* Emergency Notice */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Emergency Helpline</h3>
              <p className="text-red-700">For medical emergencies, call <strong>108</strong> immediately</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search first aid procedures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGuides.map((guide) => (
          <Card 
            key={guide.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setSelectedGuide(guide)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{guide.duration}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{guide.difficulty}</Badge>
                <Button size="sm" variant="ghost">
                  View Guide →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No first aid guides found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FirstAidGuide;
