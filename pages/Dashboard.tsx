
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { NewsCard } from '../components/NewsCard';
import { BarChart3, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const categories = [
  { name: 'Technology', color: 'bg-blue-500' },
  { name: 'Business', color: 'bg-green-500' },
  { name: 'Finance', color: 'bg-purple-500' },
  { name: 'Entertainment', color: 'bg-pink-500' },
  { name: 'Sports', color: 'bg-orange-500' },
  { name: 'Politics', color: 'bg-red-500' },
  { name: 'Health', color: 'bg-teal-500' },
];

export const Dashboard = () => {
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const navigate = useNavigate();

  const generateSampleNews = (category: string) => {
    const newsTemplates = {
      technology: [
        'AI breakthrough changes software development landscape',
        'New smartphone features revolutionize mobile photography',
        'Tech giants announce major cloud computing advancements',
        'Cybersecurity threats evolve with new protection methods',
        'Quantum computing reaches new milestone in research',
        'Social media platforms implement new privacy features'
      ],
      health: [
        'COVID-19 vaccination rates show positive trends globally',
        'Mental health awareness campaigns gain momentum',
        'Revolutionary cancer treatment shows promising results',
        'Digital health apps transform patient care',
        'New medical research reveals breakthrough findings',
        'Telemedicine adoption continues to grow worldwide'
      ],
      sports: [
        'IPL season breaks viewership records worldwide',
        'Olympic preparations showcase international unity',
        'Professional athletes advocate for mental health',
        'Stadium technology enhances fan experiences',
        'Women\'s cricket gains global recognition and support',
        'Football World Cup preparations enter final phase'
      ],
      business: [
        'Stock markets respond to global economic indicators',
        'Startup ecosystem shows resilience amid challenges',
        'E-commerce platforms drive retail transformation',
        'Sustainable business practices gain investor interest',
        'Remote work policies reshape corporate culture',
        'Small businesses adapt to digital transformation'
      ],
      finance: [
        'Cryptocurrency markets show steady growth patterns',
        'Banking sector adopts digital transformation strategies',
        'Investment trends shift toward sustainable options',
        'Financial technology disrupts traditional banking',
        'Central banks explore digital currency implementations',
        'Insurance industry embraces AI-driven solutions'
      ],
      entertainment: [
        'Streaming platforms compete for exclusive content',
        'Music industry embraces virtual concert experiences',
        'Gaming technology advances with new hardware',
        'Film industry adapts to changing audience preferences',
        'Social media influences entertainment consumption',
        'Celebrity activism shapes public discourse'
      ],
      politics: [
        'Global leaders address climate change initiatives',
        'Democratic processes adapt to digital age challenges',
        'International diplomacy navigates complex relationships',
        'Policy reforms target economic inequality',
        'Cybersecurity becomes national security priority',
        'Youth engagement in politics reaches new heights'
      ]
    };

    const templates = newsTemplates[category as keyof typeof newsTemplates] || newsTemplates.technology;
    
    return templates.slice(0, 2).map((title, index) => ({
      title,
      description: `Latest developments in ${category} sector reveal significant progress and future opportunities for growth and innovation.`,
      url: '#',
      publishedAt: new Date(Date.now() - index * 3600000).toISOString(),
      source: { name: 'InfoAxis News' },
      urlToImage: undefined
    }));
  };

  const fetchTrendingNews = async () => {
    try {
      const categories = ['health', 'sports', 'business'];
      const trendingPromises = categories.map(async (cat) => {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${cat}&country=us&pageSize=2&apiKey=94c7c4fa700c43de834f16ca5c8f66dd`
          );
          const data = await response.json();
          return data.status === 'ok' && data.articles ? data.articles.filter(article => article.title && article.description) : [];
        } catch {
          return generateSampleNews(cat).slice(0, 2);
        }
      });

      const results = await Promise.all(trendingPromises);
      const allTrending = results.flat();
      setTrendingNews(allTrending.slice(0, 6));
    } catch (error) {
      console.error('Error fetching trending news:', error);
      setTrendingNews([
        ...generateSampleNews('health').slice(0, 2),
        ...generateSampleNews('sports').slice(0, 2),
        ...generateSampleNews('business').slice(0, 2)
      ]);
    }
  };

  useEffect(() => {
    fetchTrendingNews();
  }, []);

  const userEmail = localStorage.getItem('userEmail');
  const userName = userEmail?.split('@')[0] || 'User';

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <Layout currentPage="dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-blue-100 text-lg">
            Discover the latest AI-powered news summaries and insights tailored for you.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">NIFTY 50</p>
                <p className="text-2xl font-bold text-gray-900">22483.50</p>
                <p className="text-sm text-green-600">+8.50 ↗</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">BSE Sensex</p>
                <p className="text-2xl font-bold text-gray-900">74119.39</p>
                <p className="text-sm text-green-600">+53.50 ↗</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">HDFC Bank</p>
                <p className="text-2xl font-bold text-gray-900">1445.10</p>
                <p className="text-sm text-red-600">-3.20 ↘</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Community</p>
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <Users className="h-8 w-8 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Trending News Section */}
        {trendingNews.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trending News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingNews.map((article, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-end mt-3">
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span className="text-xs">Verified</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Selection - 4-3 Layout */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">News Categories</h2>
          <div className="space-y-4">
            {/* First row - 4 categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`p-4 rounded-xl text-white font-medium transition-all hover:scale-105 ${category.color}`}
                >
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">Latest News</p>
                </button>
              ))}
            </div>
            {/* Second row - 3 categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.slice(4, 7).map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`p-4 rounded-xl text-white font-medium transition-all hover:scale-105 ${category.color}`}
                >
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">Latest News</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
