import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';

function News() {
  // Track expanded state of each news item
  const [expandedItems, setExpandedItems] = useState({});
  // State for modal
  const [selectedArticle, setSelectedArticle] = useState(null);
  // Get news items from context
  const { newsItems, loading, error } = useNews();

  // Toggle expanded state of a news item
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Open article modal
  const openArticleModal = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Close article modal
  const closeArticleModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // If loading, show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">Error loading news</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  // If no news items, show empty state
  if (newsItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <p className="text-xl font-bold">No news items available</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section with Featured News */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Latest News</h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest developments, events, and achievements in the BSIS community.
            </p>
          </motion.div>
          
          {/* Featured News */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {newsItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex hover:shadow-lg transition-shadow duration-300">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img 
                    src={newsItems[0].image} 
                    alt={newsItems[0].title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ minHeight: '300px' }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-primary-blue text-white rounded-full font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3 gap-x-4 gap-y-2">
                      <span>{newsItems[0].date}</span>
                      <span className="inline-block px-3 py-1 bg-primary-blue bg-opacity-10 text-primary-blue rounded-full max-w-[200px] truncate">
                        {newsItems[0].category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-primary-blue transition-colors">
                      {newsItems[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6">{newsItems[0].summary}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {newsItems[0].author}</span>
                    <button 
                      className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      onClick={() => openArticleModal(newsItems[0])}
                    >
                      Read Full Story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* News List */}
      <div className="container py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-primary-blue pl-4">More News & Updates</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.slice(1).map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1"
            >
              {/* News Image with Category Badge */}
              <div className="relative overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 bg-primary-blue text-white text-sm font-medium rounded-full max-w-[120px] truncate">
                    {news.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-blue transition-colors line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.summary}</p>
                
                <div className="mt-auto">
                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {news.author}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          className="text-primary-blue font-medium hover:text-blue-700 transition-colors flex items-center text-sm"
                          onClick={() => openArticleModal(news)}
                        >
                          Read full story
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 rounded border bg-primary-blue text-white">1</button>
            <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-50">2</button>
            <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-50">3</button>
            <button className="px-3 py-1 rounded border text-gray-500 hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-primary-blue pl-4">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Events', 'Achievements', 'Partnerships', 'Research', 'Technology', 'Student Activities'].map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <div className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-blue bg-opacity-10 flex items-center justify-center">
                  {category === 'Events' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {category === 'Achievements' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {category === 'Partnerships' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {category === 'Research' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                  {category === 'Technology' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {category === 'Student Activities' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 break-words">{category}</h3>
                <p className="text-sm text-gray-500 mt-2 break-words">View all {category.toLowerCase()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-blue to-blue-700 py-16">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-blue opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-blue opacity-10 rounded-full transform -translate-x-20 translate-y-20"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-8 md:mb-0 md:pr-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-lg text-gray-600 mb-4">
                      Get the latest news and updates delivered directly to your inbox. Stay informed about upcoming events and opportunities.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>No spam, unsubscribe at any time</span>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 w-full">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors"
                        />
                      </div>
                      <button className="w-full bg-primary-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                        Subscribe
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Close button */}
              <button 
                onClick={closeArticleModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Article image */}
              <div className="w-full h-64 md:h-80 relative overflow-hidden">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                  <div className="flex items-center text-sm text-white mb-2">
                    <span className="mr-4">{selectedArticle.date}</span>
                    <span className="inline-block px-3 py-1 bg-primary-blue text-white rounded-full text-sm font-medium">
                      {selectedArticle.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedArticle.title}</h2>
                </div>
              </div>
              
              {/* Article content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    By {selectedArticle.author}
                  </span>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {selectedArticle.content}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={closeArticleModal}
                    className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default News;