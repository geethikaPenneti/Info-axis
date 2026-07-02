
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Users, MessageCircle, ThumbsUp, Clock, Plus } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  likes: number;
  timestamp: string;
  category: string;
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'What do you think about the latest tech regulations?',
    author: 'Emma Watson',
    content: 'I think the new regulations make sense from a privacy standpoint, but I\'m concerned about how they\'ll affect smaller tech companies.',
    replies: 12,
    likes: 24,
    timestamp: '2 hours ago',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Breaking down the AI market trends in Q2',
    author: 'David Miller',
    content: 'The compliance costs could be significant. Has anyone looked into what resources will be available to help with the transition?',
    replies: 8,
    likes: 15,
    timestamp: '4 hours ago',
    category: 'Technology'
  }
];

export const Community = () => {
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [joinMessage, setJoinMessage] = useState('');

  const handleStartDiscussion = () => {
    if (newTitle.trim() && newContent.trim()) {
      console.log('New discussion:', { title: newTitle, content: newContent });
      setNewTitle('');
      setNewContent('');
      setShowNewDiscussion(false);
    }
  };

  const handleJoinDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    setShowJoinModal(true);
  };

  const handleSubmitJoin = () => {
    if (joinMessage.trim() && selectedDiscussion) {
      console.log('Joining discussion:', selectedDiscussion.title, 'with message:', joinMessage);
      setJoinMessage('');
      setShowJoinModal(false);
      setSelectedDiscussion(null);
    }
  };

  return (
    <Layout currentPage="community">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
              <p className="text-gray-600">Active Discussions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">10K+</p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
          </div>
        </div>

        {/* Stats and Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Start New Discussion */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNewDiscussion(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Start New Discussion</span>
                </button>
                <p className="text-gray-600">Share your thoughts on the latest news</p>
              </div>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {discussion.category}
                        </span>
                        <span className="text-sm text-gray-500">{discussion.timestamp}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {discussion.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {discussion.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{discussion.replies} replies</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="text-sm">{discussion.likes} likes</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-gray-700">
                            by {discussion.author}
                          </span>
                          <button
                            onClick={() => handleJoinDiscussion(discussion)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Join Discussion
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be respectful and constructive in all discussions</li>
                <li>• Avoid sharing any sensitive or personal information</li>
                <li>• Only post content when sharing news or updates</li>
                <li>• Report newcomers and help them get started</li>
                <li>• Focus on the topic of discussion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* New Discussion Modal */}
        {showNewDiscussion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Start New Discussion</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="What's your discussion about?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Provide some details to start the conversation..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={handleStartDiscussion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Discussion
                </button>
                <button
                  onClick={() => setShowNewDiscussion(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Join Discussion Modal */}
        {showJoinModal && selectedDiscussion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Join Discussion: {selectedDiscussion.title}
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  value={joinMessage}
                  onChange={(e) => setJoinMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSubmitJoin}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Join Discussion
                </button>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
