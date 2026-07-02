
import { Layout } from '../components/Layout';
import { Calendar, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees?: number;
  category: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    date: 'June 15-17, 2025 • San Francisco, CA',
    location: 'San Francisco, CA',
    description: 'Annual gathering of technology leaders and innovators',
    attendees: 5000,
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Financial Markets Conference',
    date: 'July 8, 2025 • New York, NY',
    location: 'New York, NY',
    description: 'Expert insights on global financial trends and market analysis',
    attendees: 1200,
    category: 'Finance'
  },
  {
    id: '3',
    title: 'Healthcare Innovation Forum',
    date: 'August 22-23, 2025 • Boston, MA',
    location: 'Boston, MA',
    description: 'Exploring the future of healthcare and medical technology',
    attendees: 800,
    category: 'Healthcare'
  },
  {
    id: '4',
    title: 'Business Leadership Summit',
    date: 'September 10, 2025 • Chicago, IL',
    location: 'Chicago, IL',
    description: 'Strategies for business growth and leadership development',
    attendees: 600,
    category: 'Business'
  },
  {
    id: '5',
    title: 'Entertainment Industry Expo',
    date: 'October 5-7, 2025 • Los Angeles, CA',
    location: 'Los Angeles, CA',
    description: 'Showcasing the latest trends in media and entertainment',
    attendees: 3000,
    category: 'Entertainment'
  },
  {
    id: '6',
    title: 'Global Politics Forum',
    date: 'November 12, 2025 • Washington, DC',
    location: 'Washington, DC',
    description: 'Analysis of international relations and policy making',
    attendees: 400,
    category: 'Politics'
  }
];

export const Events = () => {
  return (
    <Layout currentPage="events">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
          <p className="text-indigo-100 text-lg">
            Stay connected with industry leaders and expand your network
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {event.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  {event.attendees && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{event.attendees.toLocaleString()} expected attendees</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
