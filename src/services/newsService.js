// Local news service implementation
// Using localStorage to persist news items and prevent duplication in StrictMode
const NEWS_STORAGE_KEY = 'psite_news';

// Initialize with default news items only if storage is empty
const initializeNews = () => {
  const storedNews = localStorage.getItem(NEWS_STORAGE_KEY);
  if (!storedNews) {
    const defaultNews = [
      {
        id: 1,
        title: "BSIS Department Hosts Successful Tech Summit",
        date: "March 20, 2025",
        category: "Events",
        summary: "The BSIS Department recently hosted a successful tech summit featuring industry leaders and innovative discussions on emerging technologies.",
        content: "The Bachelor of Science in Information Systems department's annual tech summit brought together industry experts, students, and faculty for a day of learning and networking. Keynote speakers from major tech companies discussed the latest trends in information systems and career opportunities for graduates. Students had the opportunity to participate in hands-on workshops and connect with potential employers through a career fair that featured over 20 companies from various technology sectors. The event concluded with a panel discussion on the future of information systems in addressing global challenges.",
        image: "/Digital Ocean.png",
        author: "Admin Team"
      },
      {
        id: 2,
        title: "Students Win Top Honors at Regional Hackathon",
        date: "March 15, 2025",
        category: "Achievements",
        summary: "BSIS students secured first place at the regional hackathon with their innovative solution for community healthcare.",
        content: "A team of five BSIS students demonstrated exceptional skills at the Regional Tech Hackathon, winning first place with their project 'HealthConnect' - a platform designed to improve access to healthcare services in rural communities. The judges praised the team's technical implementation and focus on social impact. The students developed a mobile application that connects patients in remote areas with healthcare providers through telemedicine and coordinates transportation services when in-person care is needed. The team will now represent the region in the national competition taking place next month.",
        image: "/Github.png",
        author: "Faculty Advisor"
      },
      {
        id: 3,
        title: "New Partnership with Leading Tech Company Announced",
        date: "March 10, 2025",
        category: "Partnerships",
        summary: "PSITE DFCAMCLP Chapter announces new partnership with a leading tech company to enhance student opportunities.",
        content: "We are excited to announce our new strategic partnership with TechCorp, a leading technology company. This collaboration will provide our students with internship opportunities, specialized workshops, and access to cutting-edge resources. The partnership represents our commitment to preparing students for successful careers in the rapidly evolving tech industry. As part of this agreement, TechCorp will offer five annual scholarships to outstanding BSIS students and participate in curriculum development to ensure our program remains aligned with industry needs.",
        image: "/TheBlock.png",
        author: "Department Chair"
      },
      {
        id: 4,
        title: "Faculty Research Published in International Journal",
        date: "March 5, 2025",
        category: "Research",
        summary: "BSIS faculty members' research on AI applications in education has been published in a prestigious international journal.",
        content: "We're proud to announce that research conducted by our faculty members Dr. Maria Santos and Prof. James Rodriguez on 'Artificial Intelligence Applications in Higher Education' has been published in the International Journal of Educational Technology. Their groundbreaking work examines how AI can enhance learning outcomes and administrative processes in academic institutions. The research included a year-long study involving over 500 students and demonstrated a 27% improvement in learning outcomes when AI-assisted teaching methods were employed. This publication strengthens our department's reputation as a leader in educational technology research.",
        image: "/Notion.png",
        author: "Research Department"
      }
    ];
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(defaultNews));
    return defaultNews;
  }
  return JSON.parse(storedNews);
};

export const newsService = {
  // Fetch all news items
  getAllNews: async () => {
    return initializeNews();
  },

  // Create a new news item
  createNews: async (newsItem) => {
    const news = initializeNews();
    const newNewsItem = { ...newsItem, id: Date.now() };
    const updatedNews = [...news, newNewsItem];
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updatedNews));
    return newNewsItem;
  },

  // Update an existing news item
  updateNews: async (newsItem) => {
    const news = initializeNews();
    const index = news.findIndex(n => n.id === newsItem.id);
    if (index !== -1) {
      const updatedNews = [...news];
      updatedNews[index] = newsItem;
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updatedNews));
      return newsItem;
    }
    throw new Error('News item not found');
  },

  // Delete a news item
  deleteNews: async (id) => {
    const news = initializeNews();
    const index = news.findIndex(n => n.id === id);
    if (index !== -1) {
      const updatedNews = news.filter(newsItem => newsItem.id !== id);
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(updatedNews));
      return true;
    }
    throw new Error('News item not found');
  }
};