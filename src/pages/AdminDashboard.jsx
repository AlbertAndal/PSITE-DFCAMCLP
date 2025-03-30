import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext'; // Import events context
import { useTeam } from '../context/TeamContext'; // Import team context
import { useNews } from '../context/NewsContext'; // Import news context
import { FaLinkedin, FaGithub, FaEnvelope, FaGlobe } from 'react-icons/fa'; // Import social media icons

function AdminDashboard() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents(); // Get functions from context
  const { teamMembers, addMember, updateMember, removeMember, loading: teamLoading, error: teamError } = useTeam(); // Get team functions with loading/error states
  const { newsItems, loading: newsLoading, error: newsError, addNews, updateNews, deleteNews } = useNews(); // Get news functions and data from context
  
  // For news image upload
  const [newsImage, setNewsImage] = useState(null);
  
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [teamMemberToDelete, setTeamMemberToDelete] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('events'); // Track active tab: 'events', 'team', 'alumni', or 'news'
  const [selectedImage, setSelectedImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null); // For showing user feedback
  const navigate = useNavigate();

  // Filter team members based on type
  const coreTeamMembers = teamMembers.filter(member => !member.type || member.type === 'core');
  const alumniMembers = teamMembers.filter(member => member.type === 'alumni');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/contact');
    }
  }, []);

  // Clear status message after 3 seconds
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Event handling functions
  const handleEdit = (event) => {
    setIsAddMode(false);
    setEditingEvent(event);
  };

  const handleDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete.id);
      setShowDeleteConfirm(false);
      setEventToDelete(null);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    await updateEvent(updatedEvent);
    setEditingEvent(null);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: null, // Set to null to indicate it's a new event
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      registrationUrl: '' // Added registration URL field
    };
    setIsAddMode(true);
    setEditingEvent(newEvent);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventData = {
      ...editingEvent,
      title: formData.get('title'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location'),
      description: formData.get('description'),
      registrationUrl: formData.get('registrationUrl') // Added registration URL field
    };

    if (isAddMode) {
      await addEvent(eventData);
    } else {
      await updateEvent(eventData);
    }
    
    setEditingEvent(null);
    setIsAddMode(false);
  };

  // Team member handling functions
  const handleEditTeamMember = (member) => {
    console.log("Editing team member:", member);
    setIsAddMode(false);
    setEditingTeamMember(member);
    setSelectedImage(null); // Reset selected image
  };

  const handleDeleteTeamMember = (member) => {
    setTeamMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTeamMember = async () => {
    if (teamMemberToDelete) {
      try {
        await removeMember(teamMemberToDelete.id);
        setStatusMessage({
          type: 'success',
          text: 'Team member deleted successfully'
        });
      } catch (err) {
        console.error("Error deleting team member:", err);
        setStatusMessage({
          type: 'error',
          text: `Error deleting team member: ${err.message}`
        });
      }
      setShowDeleteConfirm(false);
      setTeamMemberToDelete(null);
    }
  };

  const handleAddTeamMember = () => {
    console.log("Adding new team member");
    const newTeamMember = {
      id: null, // Set to null to indicate it's a new team member
      name: '',
      position: '',
      imageUrl: '',
      order: teamMembers?.length > 0 ? teamMembers.length + 1 : 1
    };
    setIsAddMode(true);
    setEditingTeamMember(newTeamMember);
    setSelectedImage(null); // Reset selected image
  };

  const handleTeamMemberFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Make sure to parse the order as integer
    let orderValue = formData.get('order');
    orderValue = orderValue ? parseInt(orderValue, 10) : 1;
    
    const teamMemberData = {
      ...editingTeamMember,
      name: formData.get('name'),
      position: formData.get('position'),
      order: orderValue,
      // Add new fields
      type: formData.get('type'),
      batch: formData.get('batch') || '',
      institution: formData.get('institution') || 'DFCAMCLP',
      // Social media links
      linkedin: formData.get('linkedin') || '',
      github: formData.get('github') || '',
      email: formData.get('email') || '',
      website: formData.get('website') || ''
    };

    console.log("Submitting team member:", teamMemberData);

    try {
      if (isAddMode) {
        await addMember(teamMemberData, selectedImage);
        setStatusMessage({
          type: 'success',
          text: 'Team member added successfully!'
        });
      } else {
        await updateMember(teamMemberData, selectedImage);
        setStatusMessage({
          type: 'success',
          text: 'Team member updated successfully!'
        });
      }
      
      setEditingTeamMember(null);
      setIsAddMode(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error saving team member:", error);
      setStatusMessage({
        type: 'error',
        text: `Error saving team member: ${error.message}`
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file.name, "size:", file.size);
      setSelectedImage(file);
    }
  };
  
  // Handle news image upload
  const handleNewsImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected news image:", file.name, "size:", file.size);
      setNewsImage(file);
    }
  };

  // News handling functions
  const handleEditNews = (news) => {
    setIsAddMode(false);
    setEditingNews(news);
  };

  const handleDeleteNews = (news) => {
    setNewsToDelete(news);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteNews = () => {
    if (newsToDelete) {
      // Filter out the deleted news item
      setNewsItems(prev => prev.filter(item => item.id !== newsToDelete.id));
      setStatusMessage({
        type: 'success',
        text: 'News item deleted successfully'
      });
      setShowDeleteConfirm(false);
      setNewsToDelete(null);
    }
  };

  const handleAddNews = () => {
    const newNewsItem = {
      id: newsItems.length > 0 ? Math.max(...newsItems.map(item => item.id)) + 1 : 1, // Generate a new ID
      title: '',
      date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}),
      category: '',
      summary: '',
      content: '',
      image: '',
      author: 'Admin Team'
    };
    setIsAddMode(true);
    setEditingNews(newNewsItem);
    setNewsImage(null); // Reset news image when adding a new news item
  };

  const handleNewsFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newsData = {
      ...editingNews,
      title: formData.get('title'),
      date: formData.get('date'),
      category: formData.get('category'),
      summary: formData.get('summary'),
      content: formData.get('content'),
      author: formData.get('author') || 'Admin Team',
      image: editingNews.image // Keep existing image if not changed
    };

    // If a new image was selected, create a URL for it
    // In a real app, you would upload this to a server and get a URL back
    if (newsImage) {
      // For demo purposes, we'll just use a placeholder or existing image path
      // In production, you would upload the image and get the URL from the server
      const imageName = newsImage.name;
      console.log("Selected news image:", imageName);
      
      // In a real implementation, this would be the URL returned from the server
      // For now, we'll use a placeholder path
      newsData.image = `/${imageName}`; // In production, this would be the actual URL
    }

    try {
      if (isAddMode) {
        // Add the new news item
        setNewsItems(prev => [...prev, newsData]);
        setStatusMessage({
          type: 'success',
          text: 'News item added successfully!'
        });
      } else {
        // Update the existing news item
        setNewsItems(prev => 
          prev.map(item => item.id === newsData.id ? newsData : item)
        );
        setStatusMessage({
          type: 'success',
          text: 'News item updated successfully!'
        });
      }
      
      setEditingNews(null);
      setIsAddMode(false);
      setNewsImage(null); // Reset the news image state
    } catch (error) {
      console.error("Error saving news item:", error);
      setStatusMessage({
        type: 'error',
        text: `Error saving news item: ${error.message}`
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/contact');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Status message for user feedback */}
        {statusMessage && (
          <div className={`mb-4 p-3 rounded-md ${
            statusMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* Tab navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'events'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'team'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('team')}
          >
            Core Team
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'alumni'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('alumni')}
          >
            Our Alumni
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'news'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('news')}
          >
            News
          </button>
        </div>

        {/* Events Management */}
        {activeTab === 'events' && (
          <>
            <div className="mb-4">
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-yellow hover:text-gray-900 transition-colors"
              >
                Add Event
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.length > 0 ? events.map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-primary-blue hover:text-primary-yellow mr-4 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No events found. Click "Add Event" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Team Management */}
        {activeTab === 'team' && (
          <>
            <div className="mb-4">
              <button
                onClick={handleAddTeamMember}
                className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-yellow hover:text-gray-900 transition-colors"
              >
                Add Team Member
              </button>
            </div>

            {teamError && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-300">
                Error: {teamError}
              </div>
            )}

            {teamLoading ? (
              <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                <span className="ml-2 text-gray-700">Loading team members...</span>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  {coreTeamMembers && coreTeamMembers.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Links</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {coreTeamMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {member.imageUrl ? (
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                                  onError={(e) => {
                                    console.log("Image load error, using placeholder");
                                    e.target.src = 'https://via.placeholder.com/40?text=Error';
                                  }}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">No img</span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.position}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.order}</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                {member.linkedin && (
                                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                                     className="text-gray-500 hover:text-blue-600" title="LinkedIn">
                                    <FaLinkedin size={16} />
                                  </a>
                                )}
                                {member.github && (
                                  <a href={member.github} target="_blank" rel="noopener noreferrer"
                                     className="text-gray-500 hover:text-gray-900" title="GitHub">
                                    <FaGithub size={16} />
                                  </a>
                                )}
                                {member.email && (
                                  <a href={`mailto:${member.email}`}
                                     className="text-gray-500 hover:text-red-500" title="Email">
                                    <FaEnvelope size={16} />
                                  </a>
                                )}
                                {member.website && (
                                  <a href={member.website} target="_blank" rel="noopener noreferrer"
                                     className="text-gray-500 hover:text-green-600" title="Website">
                                    <FaGlobe size={16} />
                                  </a>
                                )}
                                {!member.linkedin && !member.github && !member.email && !member.website && (
                                  <span className="text-gray-400 text-xs italic">No links</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <button
                                onClick={() => handleEditTeamMember(member)}
                                className="text-primary-blue hover:text-primary-yellow mr-4 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTeamMember(member)}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No team members found. Click "Add Team Member" to create one.
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Alumni Management */}
        {activeTab === 'alumni' && (
          <>
            <div className="mb-4">
              <button
                onClick={handleAddTeamMember}
                className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-yellow hover:text-gray-900 transition-colors"
              >
                Add Alumni Member
              </button>
            </div>

            {teamError && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-300">
                Error: {teamError}
              </div>
            )}

            {teamLoading ? (
              <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                <span className="ml-2 text-gray-700">Loading alumni members...</span>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  {alumniMembers && alumniMembers.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Links</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {alumniMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {member.imageUrl ? (
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                                  onError={(e) => {
                                    console.log("Image load error, using placeholder");
                                    e.target.src = 'https://via.placeholder.com/40?text=Error';
                                  }}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-500 text-xs">No img</span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.position}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.order}</td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                {member.linkedin && (
                                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                                     className="text-gray-500 hover:text-blue-600" title="LinkedIn">
                                    <FaLinkedin size={16} />
                                  </a>
                                )}
                                {member.github && (
                                  <a href={member.github} target="_blank" rel="noopener noreferrer"
                                     className="text-gray-500 hover:text-gray-900" title="GitHub">
                                    <FaGithub size={16} />
                                  </a>
                                )}
                                {member.email && (
                                  <a href={`mailto:${member.email}`}
                                     className="text-gray-500 hover:text-red-500" title="Email">
                                    <FaEnvelope size={16} />
                                  </a>
                                )}
                                {member.website && (
                                  <a href={member.website} target="_blank" rel="noopener noreferrer"
                                     className="text-gray-500 hover:text-green-600" title="Website">
                                    <FaGlobe size={16} />
                                  </a>
                                )}
                                {!member.linkedin && !member.github && !member.email && !member.website && (
                                  <span className="text-gray-400 text-xs italic">No links</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <button
                                onClick={() => handleEditTeamMember(member)}
                                className="text-primary-blue hover:text-primary-yellow mr-4 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTeamMember(member)}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No alumni members found. Click "Add Alumni Member" to create one.
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* News Management */}
        {activeTab === 'news' && (
          <>
            <div className="mb-4">
              <button
                onClick={handleAddNews}
                className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-yellow hover:text-gray-900 transition-colors"
              >
                Add News
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newsItems.map((news) => (
                      <tr key={news.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {news.image ? (
                            <img 
                              src={news.image} 
                              alt={news.title} 
                              className="h-10 w-16 object-cover rounded shadow"
                              onError={(e) => {
                                console.log("Image load error, using placeholder");
                                e.target.src = 'https://via.placeholder.com/60x40?text=News';
                              }}
                            />
                          ) : (
                            <div className="h-10 w-16 rounded bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No img</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-sm font-medium text-gray-900">{news.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{news.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[100px] truncate">
                          <span className="inline-block bg-blue-100 text-primary-blue px-2 py-1 rounded-full text-xs">
                            {news.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{news.author || 'Admin Team'}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-[150px]">
                          <div className="truncate">{news.summary}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3 justify-center">
                            <button
                              onClick={() => handleEditNews(news)}
                              className="px-3 py-1 bg-blue-100 text-primary-blue rounded-md hover:bg-blue-200 transition-colors text-sm font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNews(news)}
                              className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Event Edit/Add Modal */}
        {editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="bg-white rounded-lg p-6 md:p-8 max-w-xl w-full shadow-xl my-8" 
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{isAddMode ? 'Add Event' : 'Edit Event'}</h2>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingEvent.title}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        name="date"
                        defaultValue={editingEvent.date}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        name="time"
                        defaultValue={editingEvent.time}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={editingEvent.location}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingEvent.description}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base resize-y"
                      required
                      style={{lineHeight: "1.5"}}
                    ></textarea>
                    <p className="mt-2 text-xs text-gray-500">Please provide a detailed description of the event including purpose, agenda, and target audience.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration URL</label>
                    <input
                      type="url"
                      name="registrationUrl"
                      defaultValue={editingEvent.registrationUrl}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                      placeholder="https://example.com/register"
                    />
                    <p className="mt-2 text-xs text-gray-500">Enter the URL where users can register for this event</p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary-blue text-white rounded-md hover:bg-primary-yellow hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-blue font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Team Member Edit/Add Modal */}
        {editingTeamMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="bg-white rounded-lg p-6 md:p-8 max-w-xl w-full shadow-xl my-8" 
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {isAddMode ? 
                  (activeTab === 'alumni' ? 'Add Alumni Member' : 'Add Core Team Member') : 
                  (activeTab === 'alumni' ? 'Edit Alumni Member' : 'Edit Team Member')
                }
              </h2>
              <form onSubmit={handleTeamMemberFormSubmit} className="space-y-5">
                <div className="space-y-5">
                  {/* Hidden field for the member type */}
                  <input
                    type="hidden"
                    name="type"
                    value={activeTab === 'alumni' ? 'alumni' : 'core'}
                  />
                  
                  {/* Basic Information Section */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={editingTeamMember.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                        <input
                          type="text"
                          name="position"
                          defaultValue={editingTeamMember.position}
                          placeholder={activeTab === 'alumni' ? "e.g. Former President" : "e.g. Chairperson"}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {/* Batch field - only for alumni */}
                      {activeTab === 'alumni' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Batch Year</label>
                          <input
                            type="text"
                            name="batch"
                            defaultValue={editingTeamMember.batch || ''}
                            placeholder="e.g. 2022"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                        <input
                          type="text"
                          name="institution"
                          defaultValue={editingTeamMember.institution || 'DFCAMCLP'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                        <input
                          type="number"
                          name="order"
                          defaultValue={editingTeamMember.order}
                          min="1"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">Lower numbers appear first in the list</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Media Links Section */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          name="linkedin"
                          defaultValue={editingTeamMember.linkedin || ''}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                        <input
                          type="url"
                          name="github"
                          defaultValue={editingTeamMember.github || ''}
                          placeholder="https://github.com/username"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          defaultValue={editingTeamMember.email || ''}
                          placeholder="email@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          defaultValue={editingTeamMember.website || ''}
                          placeholder="https://example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Image Section */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <label className="block text-lg font-medium text-gray-900 mb-4">Profile Picture</label>
                    <div className="flex flex-col md:flex-row items-center gap-5">
                      {/* Show current image or placeholder */}
                      {(selectedImage || editingTeamMember.imageUrl) ? (
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-md flex-shrink-0">
                          <img 
                            src={selectedImage ? URL.createObjectURL(selectedImage) : editingTeamMember.imageUrl} 
                            alt="Preview" 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/128?text=No+Image';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 flex-shrink-0">
                          <span className="text-gray-500 text-sm">No image</span>
                        </div>
                      )}
                      
                      <div className="flex-1 space-y-3">
                        <p className="text-sm text-gray-600">Upload a professional profile photo. Square images work best.</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="block w-full text-sm text-gray-500 
                            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                            file:text-sm file:font-semibold file:bg-primary-blue file:text-white 
                            hover:file:bg-primary-yellow hover:file:text-gray-900"
                        />
                        {selectedImage && (
                          <p className="text-xs text-gray-500">New image selected: {selectedImage.name}</p>
                        )}
                        {!selectedImage && editingTeamMember.imageUrl && (
                          <p className="text-xs text-gray-500">Current image will be kept unless you select a new one</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTeamMember(null);
                      setSelectedImage(null);
                    }}
                    className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary-blue text-white rounded-md hover:bg-primary-yellow hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-blue font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News Edit/Add Modal */}
        {editingNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div 
              className="bg-white rounded-lg p-6 md:p-8 max-w-3xl w-full shadow-xl my-8" 
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{isAddMode ? 'Add News' : 'Edit News'}</h2>
              <form onSubmit={handleNewsFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column - Basic info */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={editingNews.title}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input
                          type="date"
                          name="date"
                          defaultValue={editingNews.date}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          name="category"
                          defaultValue={editingNews.category}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        name="author"
                        defaultValue={editingNews.author || 'Admin Team'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                      <textarea
                        name="summary"
                        defaultValue={editingNews.summary}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base resize-y"
                        style={{lineHeight: "1.5"}}
                        required
                      ></textarea>
                      <p className="mt-2 text-xs text-gray-500">A brief summary of the news item (displayed in news cards)</p>
                    </div>
                    
                    <div className="border p-4 rounded-md bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-2">News Image</label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Show current image or placeholder */}
                        {(newsImage || editingNews.image) ? (
                          <div className="relative h-32 w-48 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                            <img 
                              src={newsImage ? URL.createObjectURL(newsImage) : editingNews.image} 
                              alt="News Preview" 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                console.log("Image load error, using placeholder");
                                e.target.src = 'https://via.placeholder.com/120x80?text=News+Image';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="h-32 w-48 bg-gray-200 flex items-center justify-center rounded-md border border-gray-300">
                            <span className="text-gray-500 text-xs">No image</span>
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleNewsImageChange}
                            className="block w-full text-sm text-gray-500 
                              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                              file:text-sm file:font-semibold file:bg-primary-blue file:text-white 
                              hover:file:bg-primary-yellow hover:file:text-gray-900"
                          />
                          {newsImage && (
                            <p className="text-xs text-gray-500 mt-2">New image selected: {newsImage.name}</p>
                          )}
                          {!newsImage && editingNews.image && (
                            <p className="text-xs text-gray-500 mt-2">Current image will be kept unless you select a new one</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - Content */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                        <span className="text-xs text-gray-500 ml-2">(Full article content)</span>
                      </label>
                      <textarea
                        name="content"
                        defaultValue={editingNews.content}
                        rows="16"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-base resize-y"
                        style={{lineHeight: "1.5"}}
                        required
                      ></textarea>
                      <p className="mt-2 text-xs text-gray-500">
                        Enter the full article content. You can separate paragraphs with blank lines.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNews(null);
                      setNewsImage(null);
                    }}
                    className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-primary-blue text-white rounded-md hover:bg-primary-yellow hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-blue font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal - Works for events, team members, and news */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full shadow-xl" 
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Confirm Delete</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <p className="text-yellow-700">
                    Are you sure you want to delete "{eventToDelete?.title || teamMemberToDelete?.name || newsToDelete?.title}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setEventToDelete(null);
                    setTeamMemberToDelete(null);
                    setNewsToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={eventToDelete ? confirmDelete : teamMemberToDelete ? confirmDeleteTeamMember : confirmDeleteNews}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AdminDashboard;