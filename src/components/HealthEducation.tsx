
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Users, Award, Share } from 'lucide-react';

const HealthEducation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const educationTopics = [
    {
      id: 1,
      title: 'Hand Hygiene & Sanitation',
      category: 'Hygiene',
      readTime: '5 min read',
      level: 'Basic',
      description: 'Learn proper handwashing techniques and importance of sanitation',
      content: {
        overview: 'Proper hand hygiene is one of the most effective ways to prevent the spread of diseases.',
        keyPoints: [
          'Wash hands with soap for at least 20 seconds',
          'Use hand sanitizer when soap is not available',
          'Clean hands before eating and after using toilet',
          'Teach children proper handwashing technique'
        ],
        tips: [
          'Sing "Happy Birthday" twice while washing hands',
          'Use clean, running water when available',
          'Dry hands with clean towel or air dry',
          'Keep fingernails short and clean'
        ]
      },
      image: '🧼'
    },
    {
      id: 2,
      title: 'Maternal Health Care',
      category: 'Women\'s Health',
      readTime: '8 min read',
      level: 'Intermediate',
      description: 'Essential care during pregnancy and childbirth',
      content: {
        overview: 'Proper maternal care ensures healthy pregnancy and safe delivery for both mother and baby.',
        keyPoints: [
          'Regular antenatal check-ups are essential',
          'Balanced nutrition during pregnancy',
          'Avoid alcohol, smoking, and harmful substances',
          'Recognize danger signs during pregnancy'
        ],
        tips: [
          'Take iron and folic acid supplements as prescribed',
          'Get adequate rest and sleep',
          'Stay physically active with doctor\'s approval',
          'Prepare for delivery in advance'
        ]
      },
      image: '🤱'
    },
    {
      id: 3,
      title: 'Child Vaccination Schedule',
      category: 'Child Health',
      readTime: '6 min read',
      level: 'Basic',
      description: 'Complete immunization schedule for children',
      content: {
        overview: 'Vaccines protect children from serious diseases and help build community immunity.',
        keyPoints: [
          'Follow the government vaccination schedule',
          'Birth to 6 weeks: BCG, OPV, Hepatitis B',
          '6, 10, 14 weeks: DPT, OPV, Hepatitis B',
          '9-12 months: Measles vaccine'
        ],
        tips: [
          'Keep vaccination cards safe and updated',
          'Attend Anganwadi vaccination sessions',
          'Mild fever after vaccination is normal',
          'Consult ASHA worker for missed doses'
        ]
      },
      image: '💉'
    },
    {
      id: 4,
      title: 'Nutrition & Malnutrition Prevention',
      category: 'Nutrition',
      readTime: '7 min read',
      level: 'Intermediate',
      description: 'Balanced diet and preventing malnutrition in families',
      content: {
        overview: 'Good nutrition is essential for physical and mental development, especially in children.',
        keyPoints: [
          'Include variety of foods in daily diet',
          'Promote breastfeeding for first 6 months',
          'Add complementary foods after 6 months',
          'Monitor child\'s growth regularly'
        ],
        tips: [
          'Use locally available nutritious foods',
          'Include green leafy vegetables daily',
          'Ensure adequate protein intake',
          'Practice kitchen gardening for fresh vegetables'
        ]
      },
      image: '🥬'
    },
    {
      id: 5,
      title: 'Water, Sanitation & Hygiene (WASH)',
      category: 'Hygiene',
      readTime: '6 min read',
      level: 'Basic',
      description: 'Safe water practices and environmental sanitation',
      content: {
        overview: 'Clean water and proper sanitation prevent water-borne diseases and improve community health.',
        keyPoints: [
          'Use safe drinking water sources',
          'Store water in clean, covered containers',
          'Practice proper waste disposal',
          'Maintain clean toilets and surroundings'
        ],
        tips: [
          'Boil water if source is questionable',
          'Clean water storage containers regularly',
          'Separate organic and non-organic waste',
          'Keep animals away from water sources'
        ]
      },
      image: '💧'
    },
    {
      id: 6,
      title: 'Mental Health & Wellness',
      category: 'Mental Health',
      readTime: '8 min read',
      level: 'Intermediate',
      description: 'Understanding and promoting mental wellbeing',
      content: {
        overview: 'Mental health is as important as physical health for overall wellbeing and quality of life.',
        keyPoints: [
          'Recognize signs of mental health issues',
          'Practice stress management techniques',
          'Encourage social support and community connection',
          'Seek help when needed without stigma'
        ],
        tips: [
          'Practice deep breathing and meditation',
          'Maintain regular sleep schedule',
          'Stay physically active',
          'Talk to trusted friends and family'
        ]
      },
      image: '🧠'
    }
  ];

  const categories = ['All', 'Hygiene', 'Women\'s Health', 'Child Health', 'Nutrition', 'Mental Health'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTopics = educationTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Hygiene': 'bg-blue-500',
      'Women\'s Health': 'bg-pink-500',
      'Child Health': 'bg-green-500',
      'Nutrition': 'bg-orange-500',
      'Mental Health': 'bg-purple-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const TopicDetail = ({ topic }) => (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{topic.title}</CardTitle>
            <CardDescription>{topic.description}</CardDescription>
          </div>
          <Button variant="outline" onClick={() => setSelectedTopic(null)}>
            ← Back
          </Button>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <Badge className={getCategoryColor(topic.category)}>{topic.category}</Badge>
          <Badge variant="outline">{topic.level}</Badge>
          <span className="text-sm text-gray-600">{topic.readTime}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
            <p className="text-gray-700">{topic.content.overview}</p>
          </div>

          {/* Key Points */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Key Points</h4>
            <div className="space-y-2">
              {topic.content.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Tips */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Practical Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topic.content.tips.map((tip, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-800 text-sm">💡 {tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button className="flex items-center space-x-2">
              <Share className="h-4 w-4" />
              <span>Share with Community</span>
            </Button>
            <Button variant="outline">Download PDF</Button>
            <Button variant="outline">Quiz</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedTopic) {
    return (
      <div className="space-y-6">
        <TopicDetail topic={selectedTopic} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Health Education</h2>
        <p className="text-gray-600">Educational resources for community health awareness</p>
      </div>

      {/* Featured Section */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">📚</div>
            <div>
              <h3 className="font-semibold text-green-800 mb-1">Featured: Hand Hygiene Campaign</h3>
              <p className="text-green-700 text-sm mb-3">
                This week's focus: Promoting proper handwashing in your community
              </p>
              <Button size="sm" variant="outline">Join Campaign</Button>
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
                placeholder="Search health topics..."
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

      {/* Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <Card 
            key={topic.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setSelectedTopic(topic)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(topic.category)}>{topic.category}</Badge>
                <span className="text-2xl">{topic.image}</span>
              </div>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{topic.level}</Badge>
                  <span className="text-sm text-gray-600">{topic.readTime}</span>
                </div>
                <Button size="sm" variant="ghost">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Read
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{educationTopics.length}</div>
            <div className="text-sm text-gray-600">Educational Topics</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">150+</div>
            <div className="text-sm text-gray-600">Community Members Educated</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600">Active Campaigns</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthEducation;
