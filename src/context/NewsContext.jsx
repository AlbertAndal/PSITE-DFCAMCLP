import { createContext, useContext, useState, useEffect } from 'react';
import { newsService } from '../services/newsService';

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider({ children }) {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial news items
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const initialNews = await newsService.getAllNews();
        setNewsItems(initialNews);
        setError(null);
      } catch (err) {
        console.error("Error loading news:", err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  // Add new news item
  const addNews = async (newsData) => {
    try {
      const newNewsItem = await newsService.createNews(newsData);
      setNewsItems(prevNews => [...prevNews, newNewsItem]);
      return newNewsItem;
    } catch (err) {
      console.error("Error adding news:", err);
      setError('Failed to add news item');
      throw err;
    }
  };

  // Update existing news item
  const updateNews = async (newsData) => {
    try {
      const updatedNewsItem = await newsService.updateNews(newsData);
      setNewsItems(prevNews => prevNews.map(item => 
        item.id === updatedNewsItem.id ? updatedNewsItem : item
      ));
      return updatedNewsItem;
    } catch (err) {
      console.error("Error updating news:", err);
      setError('Failed to update news item');
      throw err;
    }
  };

  // Delete news item
  const deleteNews = async (newsId) => {
    try {
      await newsService.deleteNews(newsId);
      setNewsItems(prevNews => prevNews.filter(item => item.id !== newsId));
    } catch (err) {
      console.error("Error deleting news:", err);
      setError('Failed to delete news item');
      throw err;
    }
  };

  const value = {
    newsItems,
    loading,
    error,
    addNews,
    updateNews,
    deleteNews
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}